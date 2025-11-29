import { useQuery } from '@tanstack/react-query';
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getAllCategories,
} from '../api/endpoints/product.api';
import type { Category } from '../types/product.types';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};

export const useProductsByCategory = (category: Category | null) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => getProductsByCategory(category!),
    enabled: !!category,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};