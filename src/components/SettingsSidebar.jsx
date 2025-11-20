import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './SettingsSidebar.css'

function SettingsSidebar() {
  const location = useLocation()

  const menuItems = [
    {
      id: 'appearance',
      icon: '❤️',
      title: 'Appearance',
      description: 'Dark and Light mode, Font size',
      path: '/settings/appearance'
    },
    {
      id: 'restaurant',
      icon: '🏢',
      title: 'Your Restaurant',
      description: 'Dark and Light mode, Font size',
      path: '/settings/restaurant'
    },
    {
      id: 'products',
      icon: '🚫',
      title: 'Products Management',
      description: 'Manage your product, pricing, etc',
      path: '/settings/products'
    },
    {
      id: 'notifications',
      icon: '🔔',
      title: 'Notifications',
      description: 'Customize your notifications',
      path: '/settings/notifications'
    },
    {
      id: 'security',
      icon: '🔒',
      title: 'Security',
      description: 'Configure Password, PIN, etc',
      path: '/settings/security'
    },
    {
      id: 'about',
      icon: 'ℹ️',
      title: 'About Us',
      description: 'Find out more about us',
      path: '/settings/about'
    }
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <aside className="settings-sidebar">
      {menuItems.map((item) => {
        const active = isActive(item.path)
        const content = (
          <div
            className={`settings-menu-item ${active ? 'active' : ''}`}
          >
            <div className="settings-menu-content">
              <div className="settings-menu-icon">{item.icon}</div>
              <div className="settings-menu-text">
                <h3 className={active ? 'active-text' : ''}>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
            {active && <div className="settings-active-indicator"></div>}
          </div>
        )

        return (
          <Link key={item.id} to={item.path} className="settings-link">
            {content}
          </Link>
        )
      })}
    </aside>
  )
}

export default SettingsSidebar

