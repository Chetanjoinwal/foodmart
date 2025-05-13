'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaTimes, FaTag } from 'react-icons/fa';

const OfferBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-warning text-dark py-2 position-relative">
      <div className="container">
        <div className="d-flex justify-content-center align-items-center">
          <FaTag className="me-2" />
          <span className="me-2 fw-bold">Special Offer:</span>
          <span className="me-2">Use code <strong>WELCOME25</strong> for 25% off on your first order!</span>
          <Link href="/products" className="btn btn-sm btn-dark ms-3">
            Shop Now
          </Link>
        </div>

        <button 
          className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-3 p-1"
          onClick={() => setIsVisible(false)}
          aria-label="Close banner"
          style={{ fontSize: '0.8rem' }}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default OfferBanner; 