import React from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { ProductDetail } from '../components/features/product/ProductDetail';
import { Loader } from '../components/common/Loader/Loader';
import { ErrorMessage } from '../components/common/ErrorMessage/ErrorMessage';
import './ProductPage.css';

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(Number(id));

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!product) {
    return <ErrorMessage message="Product not found" />;
  }

  return (
    <div className="product-page">
      <ProductDetail product={product} />
    </div>
  );
};