import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '../../../types/product.types';
import { Loader } from '../../common/Loader/Loader';
import { ErrorMessage } from '../../common/ErrorMessage/ErrorMessage';
import './ProductList.css';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }
  console.log("products", products);

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};