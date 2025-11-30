import React from 'react';
import { useProducts, useProductsByCategory } from '../hooks/useProducts';
import { useAppSelector } from '../store/hooks';
import { ProductList } from '../components/features/product/ProductList';
import { CategoryFilter } from '../components/features/product/CategoryFilter';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const selectedCategory = useAppSelector((state) => state.user.selectedCategory);
  
  const allProductsQuery = useProducts();
  const categoryProductsQuery = useProductsByCategory(selectedCategory as any);
  
  const query = selectedCategory ? categoryProductsQuery : allProductsQuery;

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Our Products</h1>
        <p>Browse our collection of quality products</p>
      </div>
      <CategoryFilter />
      <ProductList
        products={query.data || []}
        isLoading={query.isLoading}
        error={query.error}
      />
    </div>
  );
};