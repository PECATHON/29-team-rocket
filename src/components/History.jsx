import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import CustomerSummaryCards from './CustomerSummaryCards'
import CustomerOrderHistory from './CustomerOrderHistory'
import MostOrdered from './MostOrdered'
import './History.css'
import './Dashboard.css'

function History() {
  const { isCustomer } = useAuth()

  // If customer, show Dashboard content
  if (isCustomer) {
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })

    return (
      <div className="dashboard">
        <main className="dashboard-main">
          <header className="dashboard-header">
            <div className="dashboard-title">
              <h1>My Dashboard</h1>
              <p>{currentDate}</p>
            </div>
          </header>

          <CustomerSummaryCards />

          <CustomerOrderHistory />
        </main>

        <aside className="dashboard-right-panel">
          <MostOrdered />
        </aside>
      </div>
    )
  }

  // Original History component for vendors
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('all') // all, today, week, month

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = localStorage.getItem('orderHistory')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  const getPlaceholderImage = (width, height) => {
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#2D303E"/><circle cx="50%" cy="40%" r="6" fill="#ABBBC2" opacity="0.5"/><rect x="42%" y="52%" width="16%" height="12%" rx="2" fill="#ABBBC2" opacity="0.5"/></svg>`
    return `data:image/svg+xml,${encodeURIComponent(svg)}`
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filterOrders = (orders) => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    return orders.filter(order => {
      const orderDate = new Date(order.date)
      switch (filter) {
        case 'today':
          return orderDate >= today
        case 'week':
          return orderDate >= weekAgo
        case 'month':
          return orderDate >= monthAgo
        default:
          return true
      }
    })
  }

  const filteredOrders = filterOrders(orders)

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0)

  return (
    <div className="history-page">
      <div className="history-header">
        <h1 className="history-title">Order History</h1>
        <div className="history-filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'today' ? 'active' : ''}`}
            onClick={() => setFilter('today')}
          >
            Today
          </button>
          <button
            className={`filter-btn ${filter === 'week' ? 'active' : ''}`}
            onClick={() => setFilter('week')}
          >
            This Week
          </button>
          <button
            className={`filter-btn ${filter === 'month' ? 'active' : ''}`}
            onClick={() => setFilter('month')}
          >
            This Month
          </button>
        </div>
      </div>

      <div className="history-stats">
        <div className="stat-card">
          <span className="stat-label">Total Orders</span>
          <span className="stat-value">{filteredOrders.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Revenue</span>
          <span className="stat-value">${totalRevenue.toFixed(2)}</span>
        </div>
      </div>

      <div className="history-content">
        {filteredOrders.length === 0 ? (
          <div className="empty-history">
            <div className="empty-icon">🕒</div>
            <p>No orders found</p>
            <p className="empty-subtitle">Complete a payment to see order history</p>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div className="order-info">
                    <h3 className="order-number">Order #{order.orderNumber}</h3>
                    <span className="order-date">{formatDate(order.date)}</span>
                  </div>
                  <div className="order-meta">
                    <span className={`order-type-badge ${order.orderType.toLowerCase().replace(' ', '-')}`}>
                      {order.orderType}
                    </span>
                    {order.tableNo && (
                      <span className="table-number">Table {order.tableNo}</span>
                    )}
                  </div>
                </div>

                <div className="order-items-list">
                  {order.items.map((item, index) => (
                    <div key={index} className="history-item">
                      <div className="history-item-image">
                        <img
                          src={item.image || getPlaceholderImage(50, 50)}
                          alt={item.name}
                        />
                      </div>
                      <div className="history-item-details">
                        <span className="history-item-name">{item.name}</span>
                        <span className="history-item-quantity">x{item.quantity}</span>
                      </div>
                      <span className="history-item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="order-card-footer">
                  <div className="order-payment-info">
                    <span className="payment-method">Payment: {order.paymentMethod}</span>
                  </div>
                  <div className="order-total">
                    <span className="total-label">Total:</span>
                    <span className="total-amount">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default History

