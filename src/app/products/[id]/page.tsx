'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { products, getProductById } from '@/data/products';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import ProductGrid from '@/components/ProductGrid';

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = Number(params.id);
  const product = getProductById(productId);
  
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
  };
  
  // Get related products (same category)
  const relatedProducts = product 
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3) 
    : [];
  
  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
        <p>Sorry, the product you are looking for does not exist.</p>
        <Link href="/products" className="btn btn-primary mt-3">
          Back to Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container py-5">
      <Link href="/products" className="btn btn-outline-secondary mb-4">
        <FaArrowLeft className="me-2" /> Back to Products
      </Link>
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="position-relative rounded overflow-hidden shadow-sm" style={{ height: '400px' }}>
            <Image 
              src={product.image} 
              alt={product.name} 
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
        
        <div className="col-md-6">
          <h1 className="mb-3">{product.name}</h1>
          <p className="text-primary fw-bold fs-4 mb-3">${product.price.toFixed(2)}</p>
          <p className="mb-4">{product.description}</p>
          
          <div className="d-flex mb-4">
            <div className="input-group me-3" style={{ width: '130px' }}>
              <button className="btn btn-outline-secondary" type="button">-</button>
              <input type="text" className="form-control text-center" value="1" readOnly />
              <button className="btn btn-outline-secondary" type="button">+</button>
            </div>
            
            <button 
              className="btn btn-primary" 
              onClick={handleAddToCart}
            >
              <FaShoppingCart className="me-2" /> Add to Cart
            </button>
          </div>
          
          <div className="border-top pt-4 mt-4">
            <p className="mb-2"><strong>Category:</strong> {product.category}</p>
            <p><strong>Tags:</strong> food, delicious, {product.category}</p>
          </div>
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <div className="mt-5 pt-5 border-top">
          <h3 className="mb-4">You might also like</h3>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {relatedProducts.map(relatedProduct => (
              <div className="col" key={relatedProduct.id}>
                <div className="card h-100 shadow-sm border-0">
                  <div className="position-relative" style={{ height: '200px' }}>
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{relatedProduct.name}</h5>
                    <p className="card-text text-primary fw-bold">${relatedProduct.price.toFixed(2)}</p>
                    <Link href={`/products/${relatedProduct.id}`} className="btn btn-sm btn-outline-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 