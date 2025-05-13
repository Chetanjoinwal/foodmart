'use client';

import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// export const metadata = {
//   title: 'Contact Us - FoodMart',
//   description: 'Get in touch with us for any questions or feedback.',
// };

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the form data to a server
    console.log('Form submitted:', formData);
    // Show success message
    setIsSubmitted(true);
    // Clear form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Reset form status after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  
  return (
    <div>
      <div className="bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="display-4 mb-3">Contact Us</h1>
              <p className="lead">We'd love to hear from you. Get in touch with us.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-5">
            <h2 className="mb-4">Get In Touch</h2>
            <p>Have questions about our food, delivery, or any other inquiry? Feel free to reach out to us using the contact information below or by filling out the form.</p>
            
            <div className="d-flex align-items-center mt-4">
              <div className="bg-primary rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: '50px', height: '50px' }}>
                <FaPhone className="text-white" />
              </div>
              <div>
                <h5 className="mb-1">Call Us</h5>
                <p className="mb-0">+1 (123) 456-7890</p>
              </div>
            </div>
            
            <div className="d-flex align-items-center mt-4">
              <div className="bg-primary rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: '50px', height: '50px' }}>
                <FaEnvelope className="text-white" />
              </div>
              <div>
                <h5 className="mb-1">Email Us</h5>
                <p className="mb-0">info@foodmart.com</p>
              </div>
            </div>
            
            <div className="d-flex align-items-center mt-4">
              <div className="bg-primary rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: '50px', height: '50px' }}>
                <FaMapMarkerAlt className="text-white" />
              </div>
              <div>
                <h5 className="mb-1">Visit Us</h5>
                <p className="mb-0">123 Food Street, Cuisine City</p>
              </div>
            </div>
          </div>
          
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4">Send Message</h3>
                
                {isSubmitted && (
                  <div className="alert alert-success" role="alert">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">Your Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Your Email</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    
                    <div className="col-12">
                      <label htmlFor="subject" className="form-label">Subject</label>
                      <select 
                        className="form-select" 
                        id="subject" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="order">Order Issue</option>
                        <option value="feedback">Feedback</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>
                    
                    <div className="col-12">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea 
                        className="form-control" 
                        id="message" 
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary py-3 px-4">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-fluid p-0 mt-5">
        <div className="row g-0">
          <div className="col-12">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770777!3d6.5276316952726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1648980317747!5m2!1sen!2sng" 
              width="100%" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
} 