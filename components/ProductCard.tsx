'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, description }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
  };
  
  return (
    <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
      <div className="position-relative" style={{ height: '200px' }}>
        <Image
          src={image}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="card-text flex-grow-1 text-muted small">{description.substring(0, 80)}...</p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="fw-bold text-primary">${price.toFixed(2)}</span>
          <div>
            <Link 
              href={`/products/${id}`} 
              className="btn btn-sm btn-outline-secondary me-2"
            >
              Details
            </Link>
            <button 
              className="btn btn-sm btn-primary"
              onClick={handleAddToCart}
            >
              <FaShoppingCart className="me-1" /> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 