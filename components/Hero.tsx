import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="bg-light py-5">
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-md-6">
            <h1 className="display-4 fw-bold mb-4">Delicious Food Delivered to Your Door</h1>
            <p className="lead mb-4">
              Discover a wide range of tasty meals prepared by expert chefs using the freshest ingredients. Order online and enjoy the convenience of home delivery.
            </p>
            <div className="d-grid gap-3 d-sm-flex">
              <Link href="/products" className="btn btn-primary btn-lg px-4 gap-3">
                Browse Menu
              </Link>
              <Link href="/contact" className="btn btn-outline-secondary btn-lg px-4">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="rounded-4 shadow-lg overflow-hidden">
              <img 
                src="/images/hero-food.jpg" 
                alt="Delicious food" 
                className="img-fluid w-100" 
                style={{ height: '400px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 