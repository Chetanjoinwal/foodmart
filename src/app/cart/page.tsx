'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';

export default function CartPage() {
  const { cart, totalPrice, clearCart } = useCart();
  
  const shippingFee = 5.99;
  const tax = totalPrice * 0.1; // 10% tax
  const orderTotal = totalPrice + shippingFee + tax;
  
  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="mb-4">
          <FaShoppingCart size={50} className="text-muted" />
        </div>
        <h2>Your cart is empty</h2>
        <p className="lead mb-4">Looks like you haven't added any items to your cart yet.</p>
        <Link href="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col">
          <h1 className="mb-0">Your Cart</h1>
          <p className="text-muted">{cart.length} item(s) in your cart</p>
        </div>
        <div className="col-auto">
          <Link href="/products" className="btn btn-outline-secondary">
            <FaArrowLeft className="me-2" /> Continue Shopping
          </Link>
        </div>
      </div>
      
      <div className="row g-4">
        <div className="col-lg-8">
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
          
          <div className="d-flex justify-content-between mt-4">
            <button 
              className="btn btn-outline-danger"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h4 className="mb-4">Order Summary</h4>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-4 fw-bold">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
              
              <Link 
                href="/checkout" 
                className="btn btn-primary w-100 py-3"
              >
                Proceed to Checkout
              </Link>
              
              <div className="mt-3 text-center">
                <small className="text-muted">
                  Secure payment processing. Your payment information is safe with us.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 