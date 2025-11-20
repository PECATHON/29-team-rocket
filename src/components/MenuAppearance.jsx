import React, { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import './MenuAppearance.css'

function MenuAppearance() {
  const { theme, toggleTheme } = useTheme()
  const [localTheme, setLocalTheme] = useState(theme)
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('fontSize')
    return saved || 'medium'
  })
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    setLocalTheme(theme)
    setHasChanges(false)
  }, [theme])

  const handleThemeChange = (newTheme) => {
    setLocalTheme(newTheme)
    setHasChanges(true)
  }

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize)
    setHasChanges(true)
  }

  const handleSave = () => {
    toggleTheme(localTheme)
    localStorage.setItem('fontSize', fontSize)
    setHasChanges(false)
  }

  const handleDiscard = () => {
    setLocalTheme(theme)
    const savedFontSize = localStorage.getItem('fontSize') || 'medium'
    setFontSize(savedFontSize)
    setHasChanges(false)
  }

  return (
    <div className="menu-appearance">
      <h2 className="page-title">Menu Appearance</h2>
      
      <div className="settings-section">
        <h3 className="section-title">Theme</h3>
        <div className="theme-options">
          <button
            className={`theme-option ${localTheme === 'dark' ? 'active' : ''}`}
            onClick={() => handleThemeChange('dark')}
          >
            <div className="theme-preview dark-theme"></div>
            <span>Dark Mode</span>
          </button>
          <button
            className={`theme-option ${localTheme === 'light' ? 'active' : ''}`}
            onClick={() => handleThemeChange('light')}
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
            onClick={() => handleFontSizeChange('small')}
          >
            Small
          </button>
          <button
            className={`font-option ${fontSize === 'medium' ? 'active' : ''}`}
            onClick={() => handleFontSizeChange('medium')}
          >
            Medium
          </button>
          <button
            className={`font-option ${fontSize === 'large' ? 'active' : ''}`}
            onClick={() => handleFontSizeChange('large')}
          >
            Large
          </button>
        </div>
      </div>

      <div className="settings-actions">
        <button 
          className="discard-button" 
          onClick={handleDiscard}
          disabled={!hasChanges}
        >
          Discard Changes
        </button>
        <button 
          className="save-button" 
          onClick={handleSave}
          disabled={!hasChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default MenuAppearance

