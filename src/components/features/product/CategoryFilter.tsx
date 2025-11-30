import React from 'react';
import { useCategories } from '../../../hooks/useProducts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSelectedCategory } from '../../../store/slices/userSlice';
import './CategoryFilter.css';

export const CategoryFilter: React.FC = () => {
  const { data: categories, isLoading } = useCategories();
  const selectedCategory = useAppSelector((state) => state.user.selectedCategory);
  const dispatch = useAppDispatch();

  const handleCategoryClick = (category: string | null) => {
    dispatch(setSelectedCategory(category));
  };

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="category-filter">
      <button
        className={`category-button ${selectedCategory === null ? 'active' : ''}`}
        onClick={() => handleCategoryClick(null)}
      >
        All Products
      </button>
      {categories?.map((category) => (
        <button
          key={category}
          className={`category-button ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};