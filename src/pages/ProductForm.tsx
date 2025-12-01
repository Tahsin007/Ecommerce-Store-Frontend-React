import React, { useState, useEffect } from 'react';
import type { Product } from '../types/product.types';
import { useCategories } from '../hooks/useProducts';
import './ProductForm.css';
import { Button } from '../components/common/Button/Button';

interface ProductFormProps {
    product?: Product | null;
    onSubmit: (product: Omit<Product, 'id' | 'rating'>) => void;
    onClose: () => void;
    isSubmitting: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onClose, isSubmitting }) => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        image: 'https://i.pravatar.cc', // Default image
        category: '',
    });

    const { data: categories, isLoading: isLoadingCategories } = useCategories();

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title,
                price: product.price.toString(),
                description: product.description,
                image: product.image,
                category: product.category,
            });
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            price: parseFloat(formData.price),
        });
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required step="0.01" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select id="category" name="category" value={formData.category} onChange={handleChange} required disabled={isLoadingCategories}>
                            <option value="">{isLoadingCategories ? 'Loading...' : 'Select a category'}</option>
                            {categories?.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image URL</label>
                        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} required />
                    </div>
                    <div className="form-actions">
                        <Button type="submit" className="btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Product'}
                        </Button>
                        <Button type="button" className="btn-secondary" onClick={onClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};