import React, { useState } from 'react'
import './MenuAppearance.css'

function MenuAppearance() {
  const [theme, setTheme] = useState('dark')
  const [fontSize, setFontSize] = useState('medium')

  return (
    <div className="menu-appearance">
      <h2 className="page-title">Menu Appearance</h2>
      
      <div className="settings-section">
        <h3 className="section-title">Theme</h3>
        <div className="theme-options">
          <button
            className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => setTheme('dark')}
          >
            <div className="theme-preview dark-theme"></div>
            <span>Dark Mode</span>
          </button>
          <button
            className={`theme-option ${theme === 'light' ? 'active' : ''}`}
            onClick={() => setTheme('light')}
          >
            <div className="theme-preview light-theme"></div>
            <span>Light Mode</span>
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title">Font Size</h3>
        <div className="font-size-options">
          <button
            className={`font-option ${fontSize === 'small' ? 'active' : ''}`}
            onClick={() => setFontSize('small')}
          >
            Small
          </button>
          <button
            className={`font-option ${fontSize === 'medium' ? 'active' : ''}`}
            onClick={() => setFontSize('medium')}
          >
            Medium
          </button>
          <button
            className={`font-option ${fontSize === 'large' ? 'active' : ''}`}
            onClick={() => setFontSize('large')}
          >
            Large
          </button>
        </div>
      </div>

      <div className="settings-actions">
        <button className="discard-button">Discard Changes</button>
        <button className="save-button">Save Changes</button>
      </div>
    </div>
  )
}

export default MenuAppearance

