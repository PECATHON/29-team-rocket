import React, { useState, useEffect } from 'react'
import './OrderReport.css'

function CustomerOrderHistory() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    // Load order history from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]')
    // Show most recent orders first, limit to 10
    setOrders(savedOrders.slice(0, 10))
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getPlaceholderImage = (width, height) => {
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#2D303E"/><circle cx="50%" cy="40%" r="6" fill="#ABBBC2" opacity="0.5"/><rect x="42%" y="52%" width="16%" height="12%" rx="2" fill="#ABBBC2" opacity="0.5"/></svg>`
    return `data:image/svg+xml,${encodeURIComponent(svg)}`
  }

  const getStatusClass = (status) => {
    return 'status-completed' // All past orders are completed
  }

  if (orders.length === 0) {
    return (
      <div className="order-report">
        <div className="order-report-header">
          <h2 className="order-report-title">My Order History</h2>
        </div>
        <div className="empty-orders">
          <p>No orders yet. Start ordering to see your history here!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="order-report">
      <div className="order-report-header">
        <h2 className="order-report-title">My Order History</h2>
      </div>

      <div className="order-report-table">
        <table>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Items</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="customer-cell">
                  <span className="order-number">#{order.orderNumber}</span>
                </td>
                <td className="menu-cell">
                  <div className="order-items-preview">
                    {order.items.slice(0, 2).map((item, idx) => (
                      <span key={idx} className="item-preview">
                        {item.name} {item.quantity > 1 && `(x${item.quantity})`}
                      </span>
                    ))}
                    {order.items.length > 2 && (
                      <span className="more-items">+{order.items.length - 2} more</span>
                    )}
                  </div>
                </td>
                <td className="payment-cell">{formatDate(order.date)}</td>
                <td className="payment-cell">${order.total.toFixed(2)}</td>
                <td className="status-cell">
                  <span className={`status-badge ${getStatusClass('Completed')}`}>
                    Completed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CustomerOrderHistory

