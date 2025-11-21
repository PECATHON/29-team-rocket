import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import './ReviewsRatings.css'
import './ReviewModal.css'

function ReviewsRatings() {
  const { isCustomer } = useAuth()
  const [reviews, setReviews] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [filterRating, setFilterRating] = useState('all') // all, 5, 4, 3, 2, 1

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = () => {
    // Load order history from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]')
    // Load reviews from localStorage
    const savedReviews = JSON.parse(localStorage.getItem('orderReviews') || '{}')

    // Combine orders with their reviews
    const reviewsWithOrders = savedOrders
      .map(order => ({
        ...order,
        review: savedReviews[order.id] || null
      }))
      .filter(order => {
        if (filterRating === 'all') return true
        if (!order.review) return false
        return order.review.rating === parseInt(filterRating)
      })
      .sort((a, b) => {
        // Sort by review date (most recent first) or order date
        const dateA = a.review?.date || a.date
        const dateB = b.review?.date || b.date
        return new Date(dateB) - new Date(dateA)
      })

    setReviews(reviewsWithOrders)
  }

  useEffect(() => {
    loadReviews()
  }, [filterRating])

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

    // Reload reviews
    loadReviews()
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

  const getAverageRating = () => {
    const reviewsWithRatings = reviews.filter(r => r.review)
    if (reviewsWithRatings.length === 0) return 0
    const sum = reviewsWithRatings.reduce((acc, r) => acc + r.review.rating, 0)
    return (sum / reviewsWithRatings.length).toFixed(1)
  }

  const getRatingCounts = () => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach(review => {
      if (review.review) {
        counts[review.review.rating]++
      }
    })
    return counts
  }

  const ratingCounts = getRatingCounts()
  const totalReviews = reviews.filter(r => r.review).length
  const averageRating = getAverageRating()

  return (
    <div className="reviews-ratings-page">
      <div className="reviews-header">
        <div>
          <h1 className="reviews-title">Reviews & Ratings</h1>
          <p className="reviews-subtitle">Manage and view your order reviews</p>
        </div>
        {isCustomer && totalReviews > 0 && (
          <div className="reviews-summary">
            <div className="average-rating">
              <span className="average-rating-value">{averageRating}</span>
              <div className="average-rating-stars">
                {renderStars(Math.round(parseFloat(averageRating)))}
              </div>
              <span className="average-rating-count">{totalReviews} reviews</span>
            </div>
          </div>
        )}
      </div>

      {isCustomer && (
        <div className="reviews-filters">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filterRating === 'all' ? 'active' : ''}`}
              onClick={() => setFilterRating('all')}
            >
              All ({reviews.length})
            </button>
            <button
              className={`filter-btn ${filterRating === '5' ? 'active' : ''}`}
              onClick={() => setFilterRating('5')}
            >
              5 Stars ({ratingCounts[5]})
            </button>
            <button
              className={`filter-btn ${filterRating === '4' ? 'active' : ''}`}
              onClick={() => setFilterRating('4')}
            >
              4 Stars ({ratingCounts[4]})
            </button>
            <button
              className={`filter-btn ${filterRating === '3' ? 'active' : ''}`}
              onClick={() => setFilterRating('3')}
            >
              3 Stars ({ratingCounts[3]})
            </button>
            <button
              className={`filter-btn ${filterRating === '2' ? 'active' : ''}`}
              onClick={() => setFilterRating('2')}
            >
              2 Stars ({ratingCounts[2]})
            </button>
            <button
              className={`filter-btn ${filterRating === '1' ? 'active' : ''}`}
              onClick={() => setFilterRating('1')}
            >
              1 Star ({ratingCounts[1]})
            </button>
          </div>
        </div>
      )}

      <div className="reviews-content">
        {reviews.length === 0 ? (
          <div className="empty-reviews">
            <div className="empty-reviews-icon">⭐</div>
            <h3>No orders yet</h3>
            <p>Start ordering to leave reviews and ratings!</p>
          </div>
        ) : (
          <div className="reviews-list">
            {reviews.map((order) => (
              <div key={order.id} className="review-card">
                <div className="review-card-header">
                  <div className="review-order-info">
                    <h3 className="review-order-number">Order #{order.orderNumber}</h3>
                    <span className="review-order-date">{formatDate(order.date)}</span>
                  </div>
                  <div className="review-order-total">₹{order.total.toFixed(2)}</div>
                </div>

                <div className="review-order-items">
                  <p className="review-items-label">Items:</p>
                  <div className="review-items-list">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <span key={idx} className="review-item-tag">
                        {item.name} {item.quantity > 1 && `(x${item.quantity})`}
                      </span>
                    ))}
                    {order.items.length > 3 && (
                      <span className="review-item-tag">+{order.items.length - 3} more</span>
                    )}
                  </div>
                </div>

                {order.review ? (
                  <div className="review-content">
                    <div className="review-rating-display">
                      {renderStars(order.review.rating)}
                      <span className="review-date">{formatDate(order.review.date)}</span>
                    </div>
                    {order.review.text && (
                      <p className="review-text">{order.review.text}</p>
                    )}
                    <button
                      className="edit-review-button"
                      onClick={() => handleReviewClick(order)}
                    >
                      Edit Review
                    </button>
                  </div>
                ) : (
                  <div className="no-review-content">
                    <p className="no-review-text">No review yet</p>
                    <button
                      className="add-review-button"
                      onClick={() => handleReviewClick(order)}
                    >
                      Add Review
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
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

export default ReviewsRatings

