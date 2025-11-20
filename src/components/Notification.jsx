import React, { useState } from 'react'
import './Notification.css'

function Notification() {
  const [notifications, setNotifications] = useState({
    orderNotifications: true,
    paymentNotifications: true,
    lowStockAlerts: true,
    emailNotifications: false,
    smsNotifications: false,
    soundEnabled: true
  })

  const handleToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="notification">
      <h2 className="page-title">Notifications</h2>
      
      <div className="settings-section">
        <h3 className="section-title">Notification Preferences</h3>
        
        <div className="notification-item">
          <div className="notification-info">
            <h4>Order Notifications</h4>
            <p>Receive notifications when new orders are placed</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.orderNotifications}
              onChange={() => handleToggle('orderNotifications')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h4>Payment Notifications</h4>
            <p>Get notified when payments are received</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.paymentNotifications}
              onChange={() => handleToggle('paymentNotifications')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h4>Low Stock Alerts</h4>
            <p>Alert when product inventory is running low</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.lowStockAlerts}
              onChange={() => handleToggle('lowStockAlerts')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h4>Email Notifications</h4>
            <p>Receive notifications via email</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.emailNotifications}
              onChange={() => handleToggle('emailNotifications')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h4>SMS Notifications</h4>
            <p>Receive notifications via SMS</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.smsNotifications}
              onChange={() => handleToggle('smsNotifications')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h4>Sound Alerts</h4>
            <p>Play sound when notifications arrive</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.soundEnabled}
              onChange={() => handleToggle('soundEnabled')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-actions">
        <button className="discard-button">Discard Changes</button>
        <button className="save-button">Save Changes</button>
      </div>
    </div>
  )
}

export default Notification

