import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Sidebar.css'

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, isVendor, isCustomer } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Base menu items
  const allMenuItems = [
    { icon: '🏠', name: 'Home', path: '/dashboard', vendorOnly: true },
    { icon: '🍽️', name: 'POS', path: '/' },
    { icon: '📊', name: 'Discount', path: null, vendorOnly: true },
    { icon: '🕒', name: 'History', path: '/history', customerOnly: true },
    { icon: '⚙️', name: 'Settings', path: '/settings' },
    { icon: '↩️', name: 'Logout', path: null, action: handleLogout },
  ]

  // Filter menu items based on role
  const menuItems = allMenuItems.filter(item => {
    // Hide vendor-only items from customers
    if (item.vendorOnly && isCustomer) {
      return false
    }
    // Hide customer-only items from vendors
    if (item.customerOnly && isVendor) {
      return false
    }
    return true
  })

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
          // Interchange icons: POS gets home icon
          let displayIcon = item.icon
          if (item.path === '/') {
            displayIcon = '🏠' // POS menu item shows home icon
          }

          const content = (
            <div
              className={`nav-item ${active ? 'active' : ''}`}
              title={item.name}
              style={{ cursor: item.path ? 'pointer' : 'default' }}
            >
              <span className="nav-icon">{displayIcon}</span>
            </div>
          )

          if (item.action) {
            return (
              <div key={index} onClick={item.action} style={{ cursor: 'pointer' }}>
                {content}
              </div>
            )
          }

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

