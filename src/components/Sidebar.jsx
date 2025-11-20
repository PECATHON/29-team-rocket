import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
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
    { icon: '🍽️', name: 'POS', path: '/', customerOnly: true },
    { icon: '🍕', name: 'Food Items', path: '/products', vendorOnly: true },
    { icon: '🕒', name: 'History', path: '/history', customerOnly: true },
    { icon: '⭐', name: 'Reviews & Ratings', path: '/reviews', customerOnly: true },
    { icon: '⚙️', name: 'Settings', path: '/settings' },
    { icon: '↩️', name: 'Logout', path: null, action: handleLogout },
  ]

  // Filter menu items based on role and ensure only clickable items are shown
  const menuItems = allMenuItems.filter(item => {
    // Hide vendor-only items from customers
    if (item.vendorOnly && isCustomer) {
      return false
    }
    // Hide customer-only items from vendors
    if (item.customerOnly && isVendor) {
      return false
    }
    // Remove non-clickable items (items without path or action)
    if (!item.path && !item.action) {
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

          if (item.action) {
            return (
              <div key={index} onClick={item.action} style={{ cursor: 'pointer' }}>
                {content}
              </div>
            )
          }

          if (item.path) {
            return (
              <Link key={index} to={item.path}>
                {content}
              </Link>
            )
          }

          // This should never happen due to filtering, but just in case
          return null
        })}
      </nav>
    </aside>
  )
}

export default Sidebar

