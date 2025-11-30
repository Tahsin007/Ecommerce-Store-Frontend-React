import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../../types/product.types';
import { Button } from '../../common/Button/Button';
import './ProductDetail.css';

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="product-detail">
      <Button variant="secondary" onClick={() => navigate(-1)} className="back-button">
        ← Back
      </Button>
      <div className="product-detail-content">
        <div className="product-detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-detail-info">
          <span className="product-detail-category">{product.category}</span>
          <h1 className="product-detail-title">{product.title}</h1>
          <div className="product-detail-rating">
            <span className="rating">⭐ {product.rating?.rate}</span>
            <span className="reviews">({product.rating?.count} reviews)</span>
          </div>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <p className="product-detail-description">{product.description}</p>
          <Button className="add-to-cart-button">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};