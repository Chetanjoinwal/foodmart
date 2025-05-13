'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { FaShoppingCart, FaTag, FaCheck } from 'react-icons/fa';

const COMBOS = [
  {
    id: 999,
    title: "Family Feast Combo",
    description: "Perfect for the whole family! Get 2 pizzas, 4 sides, and 2 desserts at an amazing price.",
    originalPrice: 79.99,
    offerPrice: 59.99,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=774&auto=format&fit=crop",
    highlights: [
      "2 Large Pizzas",
      "4 Side Dishes",
      "2 Desserts",
      "Free Delivery",
      "25% Savings"
    ]
  },
  {
    id: 998,
    title: "Date Night Special",
    description: "Make it a perfect evening with our romantic dinner for two. Includes appetizer, main course, and dessert.",
    originalPrice: 49.99,
    offerPrice: 39.99,
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=858&auto=format&fit=crop",
    highlights: [
      "2 Premium Entrées",
      "Shared Appetizer",
      "Dessert to Share",
      "2 Soft Drinks",
      "20% Savings"
    ]
  }
];

const ComboOfferSection: React.FC = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (combo: typeof COMBOS[0]) => {
    const comboItem = {
      id: combo.id,
      name: combo.title + " (Special Offer)",
      price: combo.offerPrice,
      image: combo.image
    };
    
    addToCart(comboItem);
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge bg-danger py-2 px-3 mb-2">
            <FaTag className="me-1" /> Limited Time Offer
          </span>
          <h2 className="display-5 mb-3">Special Combo Deals</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            Take advantage of our exclusive combo offers and save big on your favorite meals.
          </p>
        </div>

        <div className="row g-4">
          {COMBOS.map(combo => {
            const savings = combo.originalPrice - combo.offerPrice;
            const savingsPercentage = Math.round((savings / combo.originalPrice) * 100);
            
            return (
              <div key={combo.id} className="col-lg-6">
                <div className="card border-0 shadow-sm h-100 overflow-hidden">
                  <div className="position-relative">
                    <div className="position-absolute top-0 end-0 bg-danger text-white py-2 px-3 m-3 rounded-pill z-1">
                      {savingsPercentage}% OFF
                    </div>
                    <div style={{ height: '200px', position: 'relative' }}>
                      <Image
                        src={combo.image}
                        alt={combo.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <h3 className="card-title mb-2">{combo.title}</h3>
                    <p className="card-text text-muted mb-3">{combo.description}</p>
                    
                    <div className="d-flex align-items-baseline mb-3">
                      <h4 className="text-danger me-2">${combo.offerPrice.toFixed(2)}</h4>
                      <span className="text-muted text-decoration-line-through">${combo.originalPrice.toFixed(2)}</span>
                      <span className="ms-2 badge bg-success">Save ${savings.toFixed(2)}</span>
                    </div>
                    
                    <div className="mb-4">
                      <h6 className="mb-2">What's Included:</h6>
                      <div className="row">
                        {combo.highlights.map((item, index) => (
                          <div key={index} className="col-md-6">
                            <div className="d-flex align-items-center mb-2">
                              <FaCheck className="text-success me-2" />
                              <span>{item}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button 
                      className="btn btn-primary w-100 py-2"
                      onClick={() => handleAddToCart(combo)}
                    >
                      <FaShoppingCart className="me-2" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ComboOfferSection; 