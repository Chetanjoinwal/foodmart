import React from 'react';
import ProductGrid from '@/components/ProductGrid';
import { products } from '@/data/products';

export const metadata = {
  title: 'All Products - FoodMart',
  description: 'Browse our delicious selection of food items available for order.',
};

export default function ProductsPage() {
  return (
    <div>
      <div className="bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="display-4 mb-3">Our Menu</h1>
              <p className="lead">Discover our wide range of delicious food options</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col-md-12">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">All Products</h2>
              <div className="dropdown">
                <button 
                  className="btn btn-outline-secondary dropdown-toggle" 
                  type="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  Sort By
                </button>
                <ul className="dropdown-menu">
                  <li><button className="dropdown-item">Price: Low to High</button></li>
                  <li><button className="dropdown-item">Price: High to Low</button></li>
                  <li><button className="dropdown-item">Name: A to Z</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <ProductGrid products={products} />
      </div>
    </div>
  );
} 