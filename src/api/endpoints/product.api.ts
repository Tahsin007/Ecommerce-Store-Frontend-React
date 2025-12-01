import type { Product, Category } from '../../types/product.types';
import axiosInstance from '../axios.config';

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get<Product[]>('/products');
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await axiosInstance.get<Product>(`/products/${id}`);
  return response.data;
};

export const getProductsByCategory = async (category: Category): Promise<Product[]> => {
  const response = await axiosInstance.get<Product[]>(`/products/category/${category}`);
  return response.data;
};

export const getAllCategories = async (): Promise<string[]> => {
  const response = await axiosInstance.get<string[]>('/products/categories');
  return response.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
  const response = await axiosInstance.post<Product>('/products', product);
  return response.data;
};

export const updateProduct = async (id: number, product: Product): Promise<Product> => {
  const response = await axiosInstance.put<Product>(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/products/${id}`);
};