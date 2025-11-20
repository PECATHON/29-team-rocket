import React, { useState } from 'react'
import './YourRestaurant.css'

function YourRestaurant() {
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: 'Jaegar Resto',
    email: 'jaegar@resto.com',
    phone: '+1234567890',
    address: '123 Main Street, City, State 12345',
    description: 'A fine dining restaurant serving delicious meals.'
  })

  const handleChange = (field, value) => {
    setRestaurantInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="your-restaurant">
      <h2 className="page-title">Your Restaurant</h2>
      
      <div className="settings-section">
        <h3 className="section-title">Restaurant Information</h3>
        <div className="form-group">
          <label>Restaurant Name</label>
          <input
            type="text"
            value={restaurantInfo.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={restaurantInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            value={restaurantInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            value={restaurantInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={restaurantInfo.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="form-textarea"
            rows="4"
          />
        </div>
      </div>

      <div className="settings-actions">
        <button className="discard-button">Discard Changes</button>
        <button className="save-button">Save Changes</button>
      </div>
    </div>
  )
}

export default YourRestaurant

