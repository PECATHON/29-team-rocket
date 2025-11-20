import React, { useState } from 'react'
import './ConfirmationSection.css'

function ConfirmationSection({ items, subtotal, onClose, onUpdateQuantity, onRemoveItem }) {
  const [orderNotes, setOrderNotes] = useState({})

  // Get placeholder image for cart items
  const getPlaceholderImage = (width, height) => {
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#2D303E"/><circle cx="50%" cy="40%" r="6" fill="#ABBBC2" opacity="0.5"/><rect x="42%" y="52%" width="16%" height="12%" rx="2" fill="#ABBBC2" opacity="0.5"/></svg>`
    return `data:image/svg+xml,${encodeURIComponent(svg)}`
  }

  const updateNote = (itemId, note) => {
    setOrderNotes({ ...orderNotes, [itemId]: note })
  }

  return (
    <div className="confirmation-section">
      <div className="confirmation-content">
        <header className="confirmation-header">
          <button className="back-button" onClick={onClose}>
            ←
          </button>
          <div className="confirmation-title">
            <h2>Confirmation</h2>
            <p>Orders #34562</p>
          </div>
          <button className="add-item-button">
            +
          </button>
          <div className="confirmation-divider"></div>
        </header>

        <div className="confirmation-items">
          {items.length === 0 ? (
            <div className="empty-cart">No items in cart</div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="confirmation-item">
                <div className="item-main">
                  <div className="item-image">
                    <img src={item.image || getPlaceholderImage(60, 60)} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <div className="item-price-single">${item.price.toFixed(2)}</div>
                  </div>
                  <button
                    className="remove-item"
                    onClick={() => onRemoveItem(item.id)}
                    title="Remove"
                  >
                    🗑️
                  </button>
                </div>
                <div className="item-controls">
                  <div className="quantity-display">
                    <div className="qty-box">{item.quantity}</div>
                  </div>
                  <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <input
                  type="text"
                  className="item-note"
                  placeholder="Order Note..."
                  value={orderNotes[item.id] || item.note || ''}
                  onChange={(e) => updateNote(item.id, e.target.value)}
                />
              </div>
            ))
          )}
        </div>

        <div className="confirmation-totals">
          <div className="confirmation-divider-top"></div>
          <div className="total-row">
            <span>Discount</span>
            <span>$0</span>
          </div>
          <div className="total-row subtotal">
            <span>Sub total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationSection

