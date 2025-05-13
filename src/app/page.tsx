'use client';

import React from 'react';
import HeroSwiper from '@/components/HeroSwiper';
import ProductGrid from '@/components/ProductGrid';
import ComboOfferPopup from '@/components/ComboOfferPopup';
import OfferBanner from '@/components/OfferBanner';
import ComboOfferSection from '@/components/ComboOfferSection';
import { products } from '@/data/products';

export default function Home() {
  // Get a sample of featured products
  const featuredProducts = products.slice(0, 6);
  
  return (
    <div>
      <OfferBanner />
      <HeroSwiper />
      
      <section className="py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <h2 className="display-5">Our Popular Dishes</h2>
              <p className="lead text-muted">Discover our most loved food items</p>
              <div className="d-flex justify-content-center">
                <div className="border-bottom border-primary border-3 my-3" style={{ width: '50px' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <ProductGrid products={featuredProducts} />
      </section>
      
      {/* Combo Offers Section */}
      <ComboOfferSection />
      
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <h2 className="display-5 mb-4">Why Choose Us?</h2>
              <p className="lead">We're dedicated to providing you with the best food experience</p>
            </div>
          </div>
          
          <div className="row mt-5 g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '70px', height: '70px' }}>
                    <i className="fs-3">🍲</i>
                  </div>
                  <h4>Quality Food</h4>
                  <p className="text-muted">We use only the freshest ingredients to prepare our delicious meals.</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '70px', height: '70px' }}>
                    <i className="fs-3">🚚</i>
                  </div>
                  <h4>Fast Delivery</h4>
                  <p className="text-muted">Quick and reliable delivery right to your doorstep.</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '70px', height: '70px' }}>
                    <i className="fs-3">🔒</i>
                  </div>
                  <h4>Secure Ordering</h4>
                  <p className="text-muted">Safe and secure payment options for your convenience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Combo Offer Popup */}
      <ComboOfferPopup />
    </div>
  );
}
