import React from 'react'
import './SettingsSidebar.css'

function SettingsSidebar({ activeSection, onSectionChange }) {
  const menuItems = [
    {
      id: 'appearance',
      icon: '❤️',
      title: 'Appereance',
      description: 'Dark and Light mode, Font size'
    },
    {
      id: 'restaurant',
      icon: '🏢',
      title: 'Your Restaurant',
      description: 'Dark and Light mode, Font size'
    },
    {
      id: 'products',
      icon: '🚫',
      title: 'Products Management',
      description: 'Manage your product, pricing, etc'
    },
    {
      id: 'notifications',
      icon: '🔔',
      title: 'Notifications',
      description: 'Customize your notifications'
    },
    {
      id: 'security',
      icon: '🔒',
      title: 'Security',
      description: 'Configure Password, PIN, etc'
    },
    {
      id: 'about',
      icon: 'ℹ️',
      title: 'About Us',
      description: 'Find out more about Posly'
    }
  ]

  return (
    <aside className="settings-sidebar">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`settings-menu-item ${activeSection === item.id ? 'active' : ''}`}
          onClick={() => onSectionChange(item.id)}
        >
          <div className="settings-menu-content">
            <div className="settings-menu-icon">{item.icon}</div>
            <div className="settings-menu-text">
              <h3 className={activeSection === item.id ? 'active-text' : ''}>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
          {activeSection === item.id && <div className="settings-active-indicator"></div>}
        </div>
      ))}
    </aside>
  )
}

export default SettingsSidebar

