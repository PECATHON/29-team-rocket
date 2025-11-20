import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  const location = useLocation()
  
  const menuItems = [
    { icon: '🏠', name: 'Home', path: '/dashboard' },
    { icon: '🍽️', name: 'POS', path: '/' },
    { icon: '📊', name: 'Discount', path: null },
    { icon: '🕒', name: 'History', path: null },
    { icon: '⚙️', name: 'Settings', path: '/settings' },
    { icon: '↩️', name: 'Logout', path: null },
  ]

  const isActive = (path) => {
    if (!path) return false
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">🍽️</div>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => {
          const active = isActive(item.path)
          const content = (
            <div
              className={`nav-item ${active ? 'active' : ''}`}
              title={item.name}
              style={{ cursor: item.path ? 'pointer' : 'default' }}
            >
              <span className="nav-icon">{item.icon}</span>
            </div>
          )

          return item.path ? (
            <Link key={index} to={item.path}>
              {content}
            </Link>
          ) : (
            <div key={index}>
              {content}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar

