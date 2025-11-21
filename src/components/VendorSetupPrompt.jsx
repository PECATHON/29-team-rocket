import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './VendorSetupPrompt.css';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function VendorSetupPrompt() {
  const { user, refreshUser } = useAuth();
  const [showSetup, setShowSetup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    // Check if user needs vendor setup
    if (user?.role === 'RESTAURANT_OWNER' && !user?.vendor_id) {
      setShowSetup(true);
      // Pre-fill form with user data
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/api/vendor-setup/setup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create vendor profile');
      }

      // Refresh user data to get vendor_id
      await refreshUser();
      setShowSetup(false);
      alert('Vendor profile created successfully! You can now manage your menu items.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!showSetup) {
    return null;
  }

  return (
    <div className="vendor-setup-overlay">
      <div className="vendor-setup-modal">
        <div className="vendor-setup-header">
          <h2>Complete Your Vendor Profile</h2>
          <p>To manage menu items and orders, you need to set up your vendor profile.</p>
        </div>

        {error && (
          <div className="vendor-setup-error">
            {error}
          </div>
        )}

        <form className="vendor-setup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="vendor-name">Restaurant Name *</label>
            <input
              id="vendor-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Enter restaurant name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="vendor-email">Email *</label>
            <input
              id="vendor-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="vendor-phone">Phone</label>
            <input
              id="vendor-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="vendor-address">Address</label>
            <textarea
              id="vendor-address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter restaurant address"
              rows="3"
            />
          </div>

          <div className="vendor-setup-actions">
            <button
              type="submit"
              className="setup-submit-btn"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Vendor Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VendorSetupPrompt;

