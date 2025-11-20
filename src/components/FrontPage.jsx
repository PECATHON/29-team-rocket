import React from 'react'
import { useNavigate } from 'react-router-dom'
import './FrontPage.css'

function FrontPage() {
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <div className="front-page">
      {/* Animated food elements with fade effect */}
      <div className="food-animations">
        <div className="food-item food-1">🍕</div>
        <div className="food-item food-2">🍔</div>
        <div className="food-item food-3">🍜</div>
        <div className="food-item food-4">🍰</div>
        <div className="food-item food-5">🥗</div>
        <div className="food-item food-6">🍣</div>
        <div className="food-item food-7">🌮</div>
        <div className="food-item food-8">🍝</div>
      </div>

      <div className="front-page-container">
        <div className="front-page-content">
          <div className="front-page-header">
            <div className="front-page-logo">
              <div className="logo-icon-large">🍽️</div>
            </div>
            <h1 className="front-page-title">PEC BITE</h1>
            <p className="front-page-subtitle">TAP TRACK EAT REPEAT</p>
          </div>``

          <div className="quote-section">
            <div className="quote-icon">"</div>
            <p className="quote-text">
              Good food is the foundation of genuine happiness
            </p>
            
          </div>

          <button 
            className="front-page-login-button"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default FrontPage

