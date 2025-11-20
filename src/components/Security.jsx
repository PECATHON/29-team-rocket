import React, { useState } from 'react'
import './Security.css'

function Security() {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    pinEnabled: true,
    autoLock: true,
    sessionTimeout: '30'
  })

  const handleChange = (field, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleToggle = (key) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="security">
      <h2 className="page-title">Security</h2>
      
      <div className="settings-section">
        <h3 className="section-title">Password & Authentication</h3>
        
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Enter current password"
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Enter new password"
          />
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Confirm new password"
          />
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title">Security Options</h3>
        
        <div className="security-item">
          <div className="security-info">
            <h4>Two-Factor Authentication</h4>
            <p>Add an extra layer of security to your account</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={securitySettings.twoFactorEnabled}
              onChange={() => handleToggle('twoFactorEnabled')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="security-item">
          <div className="security-info">
            <h4>PIN Protection</h4>
            <p>Require PIN to access sensitive features</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={securitySettings.pinEnabled}
              onChange={() => handleToggle('pinEnabled')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="security-item">
          <div className="security-info">
            <h4>Auto Lock</h4>
            <p>Automatically lock the system after inactivity</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={securitySettings.autoLock}
              onChange={() => handleToggle('autoLock')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="form-group">
          <label>Session Timeout (minutes)</label>
          <select
            value={securitySettings.sessionTimeout}
            onChange={(e) => handleChange('sessionTimeout', e.target.value)}
            className="form-input"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">60 minutes</option>
            <option value="120">120 minutes</option>
          </select>
        </div>
      </div>

      <div className="settings-actions">
        <button className="discard-button">Discard Changes</button>
        <button className="save-button">Save Changes</button>
      </div>
    </div>
  )
}

export default Security

