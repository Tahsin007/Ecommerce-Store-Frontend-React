import React, { useState } from 'react';
import {
    useProducts,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
} from '../hooks/useProducts';
import type { Product } from '../types/product.types';
import { ProductForm } from './ProductForm';
import './AdminDashboardPage.css';

export const AdminDashboardPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const { data: products, isLoading, isError, error } = useProducts();
    const createProductMutation = useCreateProduct();
    const updateProductMutation = useUpdateProduct();
    const deleteProductMutation = useDeleteProduct();

    const handleOpenModal = (product: Product | null = null) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingProduct(null);
        setIsModalOpen(false);
    };

    const handleFormSubmit = (productData: Omit<Product, 'id' | 'rating'>) => {
        if (editingProduct) {
            updateProductMutation.mutate(
                { id: editingProduct.id, product: { ...editingProduct, ...productData } },
                { onSuccess: handleCloseModal }
            );
        } else {
            // The backend will assign the ID and rating
            const newProduct = { ...productData, id: 0, rating: { rate: 0, count: 0 } };
            createProductMutation.mutate(newProduct, { onSuccess: handleCloseModal });
        }
    };

    const handleDeleteProduct = (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProductMutation.mutate(id);
        }
    };

    if (isLoading) return <div>Loading products...</div>;
    if (isError) return <div>Error loading products: {error.message}</div>;

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Product Management</h1>
                <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                    + Add Product
                </button>
            </div>

            <div className="product-table-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>
                                    <img src={product.image} alt={product.title} className="product-image2" />
                                </td>
                                <td>{product.title}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.category}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="btn btn-secondary" onClick={() => handleOpenModal(product)}>
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteProduct(product.id)}
                                            disabled={deleteProductMutation.isPending}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <ProductForm
                    product={editingProduct}
                    onSubmit={handleFormSubmit}
                    onClose={handleCloseModal}
                    isSubmitting={createProductMutation.isPending || updateProductMutation.isPending}
                />
            )}
        </div>
    );
};