import React from 'react'
import './Sidebar.css'

function Sidebar({ currentView, onViewChange }) {
  const menuItems = [
    { icon: '🏠', name: 'Home', view: 'dashboard', active: currentView === 'dashboard' },
    { icon: '🍽️', name: 'POS', view: 'pos', active: currentView === 'pos' },
    { icon: '📊', name: 'Discount', view: null },
    { icon: '🕒', name: 'History', view: null },
    { icon: '📧', name: 'Messages', view: null },
    { icon: '⚙️', name: 'Settings', view: null },
    { icon: '↩️', name: 'Logout', view: null },
  ]

  const handleNavClick = (item) => {
    if (item.view) {
      onViewChange(item.view)
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">🍽️</div>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`nav-item ${item.active ? 'active' : ''}`}
            title={item.name}
            onClick={() => handleNavClick(item)}
            style={{ cursor: item.view ? 'pointer' : 'default' }}
          >
            <span className="nav-icon">{item.icon}</span>
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar

