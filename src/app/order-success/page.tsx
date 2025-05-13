'use client';

import React from 'react';
import Link from 'next/link';
import { FaCheckCircle, FaHome, FaShoppingBag } from 'react-icons/fa';

export default function OrderSuccessPage() {
  // Generate a random order ID for display purposes
  const orderId = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  
  return (
    <div className="container py-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-5">
              <FaCheckCircle size={80} className="text-success mb-4" />
              
              <h1 className="mb-3">Order Confirmed!</h1>
              <p className="lead mb-4">
                Thank you for your purchase. Your order has been received and is now being processed.
              </p>
              
              <div className="alert alert-light mb-4">
                <p className="mb-1">Order Number: <strong>{orderId}</strong></p>
                <p className="mb-0">A confirmation email has been sent to your email address.</p>
              </div>
              
              <div className="d-flex justify-content-center gap-3 mt-4">
                <Link href="/" className="btn btn-outline-primary">
                  <FaHome className="me-2" /> Return to Home
                </Link>
                <Link href="/products" className="btn btn-primary">
                  <FaShoppingBag className="me-2" /> Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-muted small">
              If you have any questions about your order, please contact our customer support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 