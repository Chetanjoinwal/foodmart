import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="mb-4">FoodMart</h5>
            <p>Delicious food delivered to your doorstep. We offer the best quality food items at affordable prices.</p>
            <div className="d-flex gap-3 mt-4">
              <a href="#" className="text-light">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-light">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-light">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-md-4">
            <h5 className="mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/" className="text-light text-decoration-none">Home</Link>
              </li>
              <li className="mb-2">
                <Link href="/products" className="text-light text-decoration-none">Products</Link>
              </li>
              <li className="mb-2">
                <Link href="/contact" className="text-light text-decoration-none">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-md-4">
            <h5 className="mb-4">Contact Info</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-center">
                <FaMapMarkerAlt className="me-2" />
                <span>123 Food Street, Cuisine City</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <FaPhoneAlt className="me-2" />
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <FaEnvelope className="me-2" />
                <span>info@foodmart.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="row mt-4 pt-4 border-top border-secondary">
          <div className="col-12 text-center">
            <p className="mb-0">© {new Date().getFullYear()} FoodMart. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 