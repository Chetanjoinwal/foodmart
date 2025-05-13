'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { usePayment, PaymentMethod } from '@/context/PaymentContext';
import { FaCreditCard, FaMoneyBill, FaMobileAlt, FaArrowLeft, FaCheck } from 'react-icons/fa';

type CheckoutStep = 'shipping' | 'payment' | 'review';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();
  const { 
    paymentMethod, 
    setPaymentMethod, 
    cardDetails, 
    upiId, 
    updateCardDetails, 
    updateUpiId, 
    isPaymentValid 
  } = usePayment();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const shippingFee = 5.99;
  const tax = totalPrice * 0.1; // 10% tax
  const orderTotal = totalPrice + shippingFee + tax;

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Your cart is empty</h2>
        <p className="lead mb-4">You need to add items to your cart before checkout.</p>
        <Link href="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  const handleShippingDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  const isShippingValid = () => {
    return Object.values(shippingDetails).every(value => value.trim() !== '');
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateCardDetails({ [name]: value });
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };

  const goToNextStep = () => {
    if (currentStep === 'shipping' && isShippingValid()) {
      setCurrentStep('payment');
    } else if (currentStep === 'payment' && isPaymentValid()) {
      setCurrentStep('review');
    }
  };

  const goToPreviousStep = () => {
    if (currentStep === 'payment') {
      setCurrentStep('shipping');
    } else if (currentStep === 'review') {
      setCurrentStep('payment');
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      router.push('/order-success');
      setIsProcessing(false);
    }, 2000);
  };

  const renderStepIndicator = () => (
    <div className="stepper d-flex justify-content-between mb-5">
      <div className={`step-item ${currentStep === 'shipping' ? 'active' : currentStep === 'payment' || currentStep === 'review' ? 'completed' : ''}`}>
        <div className="step-circle">
          {currentStep === 'payment' || currentStep === 'review' ? <FaCheck /> : 1}
        </div>
        <div className="step-text">Shipping</div>
      </div>
      <div className="step-line flex-grow-1 mx-2 mt-3"></div>
      <div className={`step-item ${currentStep === 'payment' ? 'active' : currentStep === 'review' ? 'completed' : ''}`}>
        <div className="step-circle">
          {currentStep === 'review' ? <FaCheck /> : 2}
        </div>
        <div className="step-text">Payment</div>
      </div>
      <div className="step-line flex-grow-1 mx-2 mt-3"></div>
      <div className={`step-item ${currentStep === 'review' ? 'active' : ''}`}>
        <div className="step-circle">3</div>
        <div className="step-text">Review</div>
      </div>
    </div>
  );

  const renderShippingStep = () => (
    <div>
      <h3 className="mb-4">Shipping Information</h3>
      <div className="row g-3">
        <div className="col-12">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            value={shippingDetails.fullName}
            onChange={handleShippingDetailsChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={shippingDetails.address}
            onChange={handleShippingDetailsChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={shippingDetails.city}
            onChange={handleShippingDetailsChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">State</label>
          <input
            type="text"
            className="form-control"
            name="state"
            value={shippingDetails.state}
            onChange={handleShippingDetailsChange}
            required
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Zip Code</label>
          <input
            type="text"
            className="form-control"
            name="zipCode"
            value={shippingDetails.zipCode}
            onChange={handleShippingDetailsChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={shippingDetails.phone}
            onChange={handleShippingDetailsChange}
            required
          />
        </div>
      </div>
      <div className="d-flex justify-content-between mt-4">
        <Link href="/cart" className="btn btn-outline-secondary">
          <FaArrowLeft className="me-2" /> Back to Cart
        </Link>
        <button
          className="btn btn-primary"
          onClick={goToNextStep}
          disabled={!isShippingValid()}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div>
      <h3 className="mb-4">Payment Method</h3>
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div 
            className={`card h-100 ${paymentMethod === 'cod' ? 'border-primary' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => handlePaymentMethodSelect('cod')}
          >
            <div className="card-body text-center p-4">
              <FaMoneyBill size={40} className="mb-3 text-success" />
              <h5>Cash on Delivery</h5>
              <p className="small text-muted mb-0">Pay when your order arrives</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div 
            className={`card h-100 ${paymentMethod === 'card' ? 'border-primary' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => handlePaymentMethodSelect('card')}
          >
            <div className="card-body text-center p-4">
              <FaCreditCard size={40} className="mb-3 text-primary" />
              <h5>Credit/Debit Card</h5>
              <p className="small text-muted mb-0">Pay securely with your card</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div 
            className={`card h-100 ${paymentMethod === 'upi' ? 'border-primary' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => handlePaymentMethodSelect('upi')}
          >
            <div className="card-body text-center p-4">
              <FaMobileAlt size={40} className="mb-3 text-warning" />
              <h5>UPI</h5>
              <p className="small text-muted mb-0">Pay via UPI apps</p>
            </div>
          </div>
        </div>
      </div>

      {paymentMethod === 'card' && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="mb-3">Card Details</h5>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="number"
                  value={cardDetails.number}
                  onChange={handleCardDetailsChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={16}
                  required
                />
              </div>
              <div className="col-12">
                <label className="form-label">Cardholder Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={cardDetails.name}
                  onChange={handleCardDetailsChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Expiry Date (MM/YY)</label>
                <input
                  type="text"
                  className="form-control"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleCardDetailsChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">CVV</label>
                <input
                  type="text"
                  className="form-control"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                  maxLength={4}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 'upi' && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="mb-3">UPI Details</h5>
            <div className="mb-3">
              <label className="form-label">UPI ID</label>
              <input
                type="text"
                className="form-control"
                value={upiId}
                onChange={(e) => updateUpiId(e.target.value)}
                placeholder="username@upi"
                required
              />
              <div className="form-text">Example: yourname@okbank, yourname@ybl</div>
            </div>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-outline-secondary" onClick={goToPreviousStep}>
          <FaArrowLeft className="me-2" /> Back to Shipping
        </button>
        <button
          className="btn btn-primary"
          onClick={goToNextStep}
          disabled={!isPaymentValid()}
        >
          Review Order
        </button>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div>
      <h3 className="mb-4">Review Order</h3>
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="mb-3">Shipping Information</h5>
          <p className="mb-1"><strong>{shippingDetails.fullName}</strong></p>
          <p className="mb-1">{shippingDetails.address}</p>
          <p className="mb-1">{shippingDetails.city}, {shippingDetails.state} {shippingDetails.zipCode}</p>
          <p className="mb-0">Phone: {shippingDetails.phone}</p>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="mb-3">Payment Method</h5>
          {paymentMethod === 'cod' && (
            <div className="d-flex align-items-center">
              <FaMoneyBill className="text-success me-2" />
              <span>Cash on Delivery</span>
            </div>
          )}
          {paymentMethod === 'card' && (
            <div className="d-flex align-items-center">
              <FaCreditCard className="text-primary me-2" />
              <span>Card ending with {cardDetails.number.slice(-4)}</span>
            </div>
          )}
          {paymentMethod === 'upi' && (
            <div className="d-flex align-items-center">
              <FaMobileAlt className="text-warning me-2" />
              <span>UPI: {upiId}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="mb-3">Order Summary</h5>
          {cart.map(item => (
            <div key={item.id} className="d-flex justify-content-between mb-2">
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr />
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
          <div className="d-flex justify-content-between fw-bold">
            <span>Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-outline-secondary" onClick={goToPreviousStep}>
          <FaArrowLeft className="me-2" /> Back to Payment
        </button>
        <button
          className="btn btn-primary"
          onClick={handlePlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>Processing<span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span></>
          ) : (
            'Place Order'
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      <h1 className="mb-4">Checkout</h1>
      
      {renderStepIndicator()}
      
      <div className="row">
        <div className="col-lg-8">
          {currentStep === 'shipping' && renderShippingStep()}
          {currentStep === 'payment' && renderPaymentStep()}
          {currentStep === 'review' && renderReviewStep()}
        </div>
        
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h4 className="mb-4">Order Summary</h4>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({cart.length} items)</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 