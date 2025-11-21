import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import './OrderReport.css'
import './ReviewModal.css'

function CustomerOrderHistory() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState('')

  useEffect(() => {
    fetchOrders()
    // Refresh every 15 seconds to get status updates
    const interval = setInterval(fetchOrders, 15000)
    return () => clearInterval(interval)
  }, [user])

  const fetchOrders = async () => {
    try {
      // Try to fetch from API first
      const { getOrders } = await import('../api/orders')
      
      const filters = {}
      if (user?.id) {
        filters.customer_id = user.id
      }

      const response = await getOrders(filters)
      
      if (response.orders && response.orders.length > 0) {
        // Transform API orders
        const transformedOrders = response.orders.map(order => ({
          id: order.id,
          orderNumber: order.order_number,
          date: order.created_at,
          items: (order.order_items || []).map(item => ({
            name: item.menu_items?.name || 'Unknown Item',
            quantity: item.quantity,
            price: parseFloat(item.unit_price)
          })),
          total: parseFloat(order.total_amount),
          status: order.status,
          paymentMethod: order.payment_method || 'Unknown'
        }))
        
        // Load reviews from localStorage
        const savedReviews = JSON.parse(localStorage.getItem('orderReviews') || '{}')
        const ordersWithReviews = transformedOrders.map(order => ({
          ...order,
          review: savedReviews[order.id] || null
        }))
        
        setOrders(ordersWithReviews.slice(0, 10))
        return
      }
    } catch (error) {
      console.error('Error fetching orders from API:', error)
    }

    // Fallback to localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]')
    const savedReviews = JSON.parse(localStorage.getItem('orderReviews') || '{}')
    const ordersWithReviews = savedOrders.map(order => ({
      ...order,
      review: savedReviews[order.id] || null,
      status: order.status || 'pending'
    }))
    setOrders(ordersWithReviews.slice(0, 10))
  }

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
    switch (status) {
      case 'pending':
        return 'status-pending'
      case 'accepted':
      case 'confirmed':
        return 'status-accepted'
      case 'rejected':
      case 'cancelled':
        return 'status-rejected'
      case 'preparing':
        return 'status-preparing'
      case 'ready':
        return 'status-ready'
      case 'delivered':
        return 'status-delivered'
      default:
        return 'status-completed'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Pending Approval'
      case 'accepted': return 'Accepted'
      case 'rejected': return 'Rejected'
      case 'confirmed': return 'Confirmed'
      case 'preparing': return 'Preparing'
      case 'ready': return 'Ready'
      case 'delivered': return 'Delivered'
      case 'cancelled': return 'Cancelled'
      default: return 'Completed'
    }
  }

  const handleReviewClick = (order) => {
    setSelectedOrder(order)
    if (order.review) {
      setReviewRating(order.review.rating)
      setReviewText(order.review.text)
    } else {
      setReviewRating(0)
      setReviewText('')
    }
    setShowReviewModal(true)
  }

  const handleSubmitReview = () => {
    if (reviewRating === 0) {
      alert('Please select a rating')
      return
    }

    const reviews = JSON.parse(localStorage.getItem('orderReviews') || '{}')
    reviews[selectedOrder.id] = {
      rating: reviewRating,
      text: reviewText,
      date: new Date().toISOString()
    }
    localStorage.setItem('orderReviews', JSON.stringify(reviews))

    // Update orders state
    const updatedOrders = orders.map(order =>
      order.id === selectedOrder.id
        ? { ...order, review: reviews[selectedOrder.id] }
        : order
    )
    setOrders(updatedOrders)
    setShowReviewModal(false)
  }

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
            onClick={interactive && onStarClick ? () => onStarClick(star) : undefined}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          >
            ⭐
          </span>
        ))}
      </div>
    )
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
              <th>Review</th>
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
                  <span className={`status-badge ${getStatusClass(order.status || 'completed')}`}>
                    {getStatusLabel(order.status || 'completed')}
                  </span>
                </td>
                <td className="review-cell">
                  {order.review ? (
                    <div className="review-display">
                      {renderStars(order.review.rating)}
                      <button
                        className="edit-review-btn"
                        onClick={() => handleReviewClick(order)}
                      >
                        Edit
                      </button>
                    </div>
                  ) : (
                    <button
                      className="add-review-btn"
                      onClick={() => handleReviewClick(order)}
                    >
                      Rate & Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showReviewModal && selectedOrder && (
        <div className="review-modal-overlay" onClick={() => setShowReviewModal(false)}>
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="review-modal-header">
              <h3>Rate Your Order #{selectedOrder.orderNumber}</h3>
              <button className="close-modal-btn" onClick={() => setShowReviewModal(false)}>
                ×
              </button>
            </div>
            <div className="review-modal-body">
              <div className="review-rating-section">
                <label>Rating</label>
                {renderStars(reviewRating, true, setReviewRating)}
              </div>
              <div className="review-text-section">
                <label>Your Review</label>
                <textarea
                  className="review-textarea"
                  placeholder="Share your experience with this order..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows="4"
                />
              </div>
            </div>
            <div className="review-modal-footer">
              <button className="cancel-review-btn" onClick={() => setShowReviewModal(false)}>
                Cancel
              </button>
              <button className="submit-review-btn" onClick={handleSubmitReview}>
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerOrderHistory

