import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../common/Card/Card';
import type { Product } from '../../../types/product.types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <div className="product-rating">
            <span className="rating-value">⭐ {product.rating?.rate}</span>
            <span className="rating-count">({product.rating?.count})</span>
          </div>
        </div>
      </div>
    </Card>
  );
};