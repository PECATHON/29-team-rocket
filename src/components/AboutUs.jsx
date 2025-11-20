import React from 'react'
import './AboutUs.css'

function AboutUs() {
  return (
    <div className="about-us">
      <h2 className="page-title">About Us</h2>
      
      <div className="about-content">
        <div className="about-section">
          <h3 className="section-title">Posly</h3>
          <p className="about-text">
            Posly is a modern Point of Sale (POS) system designed to help restaurants 
            manage their operations efficiently. Our platform provides comprehensive 
            tools for order management, inventory tracking, and business analytics.
          </p>
        </div>

        <div className="about-section">
          <h3 className="section-title">Version</h3>
          <p className="about-text">Version 1.0.0</p>
        </div>

        <div className="about-section">
          <h3 className="section-title">Features</h3>
          <ul className="features-list">
            <li>Real-time order management</li>
            <li>Product and inventory management</li>
            <li>Payment processing</li>
            <li>Sales analytics and reporting</li>
            <li>Customizable menu appearance</li>
            <li>Secure authentication and data protection</li>
          </ul>
        </div>

        <div className="about-section">
          <h3 className="section-title">Contact</h3>
          <div className="contact-info">
            <p><strong>Email:</strong> support@posly.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Website:</strong> www.posly.com</p>
          </div>
        </div>

        <div className="about-section">
          <h3 className="section-title">Terms & Privacy</h3>
          <p className="about-text">
            By using Posly, you agree to our Terms of Service and Privacy Policy. 
            We are committed to protecting your data and ensuring a secure experience.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs

