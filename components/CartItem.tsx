'use client';

import React from 'react';
import Image from 'next/image';
import { useCart, CartItem as CartItemType } from '@/context/CartContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

type CartItemProps = {
  item: CartItemType;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(item.id);
  };
  
  return (
    <div className="card mb-3 border-0 shadow-sm">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="position-relative h-100" style={{ minHeight: '120px' }}>
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, 200px"
              style={{ objectFit: 'cover' }}
              className="rounded-start"
            />
          </div>
        </div>
        <div className="col-md-10">
          <div className="card-body d-flex flex-column h-100">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">{item.name}</h5>
              <button 
                className="btn btn-sm text-danger"
                onClick={handleRemove}
                aria-label="Remove item"
              >
                <FaTrash />
              </button>
            </div>
            <div className="mt-auto d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <button 
                  className="btn btn-sm btn-outline-secondary"
                  onClick={handleDecrease}
                  aria-label="Decrease quantity"
                >
                  <FaMinus size={12} />
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button 
                  className="btn btn-sm btn-outline-secondary"
                  onClick={handleIncrease}
                  aria-label="Increase quantity"
                >
                  <FaPlus size={12} />
                </button>
              </div>
              <div className="fw-bold">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem; 