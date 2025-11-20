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
              <svg className="logo-icon-large" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer glow circle */}
                <circle cx="70" cy="70" r="65" fill="url(#outerGlow)" opacity="0.3"/>

                {/* Main circle with gradient */}
                <circle cx="70" cy="70" r="58" fill="url(#logoGradient)" stroke="#FFFFFF" strokeWidth="4"/>

                {/* Decorative inner circle */}
                <circle cx="70" cy="70" r="48" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.3"/>

                {/* Stylized fork and knife */}
                <g transform="translate(70, 70)">
                  {/* Fork */}
                  <path d="M-20 -30 L-20 25 M-20 -30 L-15 -30 M-20 -20 L-15 -20 M-20 -10 L-15 -10 M-20 0 L-15 0"
                        stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>

                  {/* Knife */}
                  <path d="M20 -30 L20 25 M20 -30 L15 -25 L15 -20 L20 -25"
                        stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="#FFFFFF"/>

                  {/* Center circle accent */}
                  <circle cx="0" cy="0" r="8" fill="#FFFFFF" opacity="0.9"/>

                  {/* Decorative dots */}
                  <circle cx="-30" cy="-30" r="3" fill="#FFFFFF" opacity="0.6"/>
                  <circle cx="30" cy="-30" r="3" fill="#FFFFFF" opacity="0.6"/>
                  <circle cx="-30" cy="30" r="3" fill="#FFFFFF" opacity="0.6"/>
                  <circle cx="30" cy="30" r="3" fill="#FFFFFF" opacity="0.6"/>
                </g>

                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF8C42" />
                    <stop offset="50%" stopColor="#FF6B35" />
                    <stop offset="100%" stopColor="#FF8C42" />
                  </linearGradient>
                  <radialGradient id="outerGlow" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#FF8C42" />
                    <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
            <h1 className="front-page-title">PEC BITE</h1>
            <p className="front-page-subtitle">TAP TRACK EAT REPEAT</p>
          </div>

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

