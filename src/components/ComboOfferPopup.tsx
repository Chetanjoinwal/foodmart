'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTimes, FaTag, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

type Combo = {
  id: number;
  title: string;
  description: string;
  originalPrice: number;
  offerPrice: number;
  image: string;
  items: {
    id: number;
    name: string;
    price: number;
    image: string;
  }[];
};

const SAMPLE_COMBO: Combo = {
  id: 999,
  title: "Family Feast Combo",
  description: "Perfect for the whole family! Get 2 pizzas, 4 sides, and 2 desserts at an amazing price.",
  originalPrice: 79.99,
  offerPrice: 59.99,
  image: "/images/ftimg (2).jpg",
  items: [
    { id: 101, name: "Pepperoni Pizza", price: 19.99, image: "/images/pizza1.jpg" },
    { id: 102, name: "Veggie Supreme Pizza", price: 18.99, image: "/images/pizza2.jpg" },
    { id: 201, name: "Garlic Breadsticks", price: 7.99, image: "/images/sides1.jpg" },
    { id: 202, name: "Chicken Wings", price: 12.99, image: "/images/sides2.jpg" },
    { id: 301, name: "Chocolate Brownie", price: 6.99, image: "/images/dessert1.jpg" },
    { id: 302, name: "Cheesecake", price: 8.99, image: "/images/dessert2.jpg" }
  ]
};

// Fallback images if the sample images don't exist
const FALLBACK_IMAGES = {
  combo: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=774&auto=format&fit=crop",
  item: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1180&auto=format&fit=crop"
};

const ComboOfferPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [combo] = useState<Combo>(SAMPLE_COMBO);
  const { addToCart } = useCart();

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      // Check if user has already seen the popup in this session
      const hasSeenPopup = sessionStorage.getItem('hasSeenComboOffer');
      if (!hasSeenPopup) {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenComboOffer', 'true');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAddComboToCart = () => {
    // Add all combo items to cart
    const comboItem = {
      id: combo.id,
      name: combo.title + " (Special Offer)",
      price: combo.offerPrice,
      image: combo.image || FALLBACK_IMAGES.combo
    };
    
    addToCart(comboItem);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  // Calculate savings
  const savings = combo.originalPrice - combo.offerPrice;
  const savingsPercentage = Math.round((savings / combo.originalPrice) * 100);

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ 
      zIndex: 1050, 
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card border-0 shadow-lg overflow-hidden">
              <button 
                className="position-absolute top-0 end-0 btn btn-sm text-white bg-dark m-3 rounded-circle" 
                onClick={handleClose}
                style={{ width: '36px', height: '36px', zIndex: 1 }}
                aria-label="Close"
              >
                <FaTimes />
              </button>

              <div className="row g-0">
                <div className="col-md-5 bg-primary position-relative d-none d-md-block">
                  <div className="position-absolute top-0 start-0 bg-danger text-white py-2 px-3 m-3 rounded-3">
                    <div className="d-flex align-items-center">
                      <FaTag className="me-2" />
                      <span className="fw-bold">{savingsPercentage}% OFF</span>
                    </div>
                  </div>
                  
                  <div className="position-relative h-100">
                    <Image 
                      src={combo.image || FALLBACK_IMAGES.combo}
                      alt={combo.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = FALLBACK_IMAGES.combo;
                      }}
                    />
                  </div>
                </div>

                <div className="col-md-7">
                  <div className="card-body p-4 p-lg-5">
                    <div className="d-md-none position-relative mb-4" style={{ height: '200px' }}>
                      <Image 
                        src={combo.image || FALLBACK_IMAGES.combo}
                        alt={combo.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-3"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = FALLBACK_IMAGES.combo;
                        }}
                      />
                      <div className="position-absolute top-0 start-0 bg-danger text-white py-2 px-3 m-2 rounded-3">
                        <div className="d-flex align-items-center">
                          <FaTag className="me-2" />
                          <span className="fw-bold">{savingsPercentage}% OFF</span>
                        </div>
                      </div>
                    </div>

                    <h2 className="card-title mb-2">{combo.title}</h2>
                    <p className="card-text mb-4">{combo.description}</p>

                    <div className="mb-4">
                      <div className="d-flex align-items-baseline">
                        <h3 className="text-danger me-2">${combo.offerPrice.toFixed(2)}</h3>
                        <span className="text-muted text-decoration-line-through">${combo.originalPrice.toFixed(2)}</span>
                        <span className="ms-2 badge bg-success">Save ${savings.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="mb-3">Included Items:</h5>
                      <div className="row g-2">
                        {combo.items.map((item) => (
                          <div key={item.id} className="col-6 col-sm-4">
                            <div className="d-flex align-items-center p-2 border rounded">
                              <div className="flex-shrink-0 position-relative" style={{ width: '40px', height: '40px' }}>
                                <Image 
                                  src={item.image || FALLBACK_IMAGES.item}
                                  alt={item.name}
                                  fill
                                  className="rounded"
                                  style={{ objectFit: 'cover' }}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = FALLBACK_IMAGES.item;
                                  }}
                                />
                              </div>
                              <div className="ms-2 text-truncate" style={{ fontSize: '0.85rem' }}>
                                {item.name}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="d-grid gap-2">
                      <button 
                        className="btn btn-primary py-3"
                        onClick={handleAddComboToCart}
                      >
                        <FaShoppingCart className="me-2" /> Add Combo to Cart
                      </button>
                      <Link 
                        href="/products" 
                        className="btn btn-outline-secondary"
                        onClick={handleClose}
                      >
                        View All Products
                      </Link>
                    </div>

                    <div className="mt-3 text-center">
                      <small className="text-muted">Limited time offer. While supplies last.</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboOfferPopup; 