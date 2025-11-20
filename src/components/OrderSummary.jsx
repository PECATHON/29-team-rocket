import React, { useState } from 'react'
import './OrderSummary.css'

function OrderSummary({ items, onUpdateQuantity, onRemoveItem, subtotal, onOpenPayment, onClose }) {
  const [orderType, setOrderType] = useState('Dine In')
  const [orderNotes, setOrderNotes] = useState({})

  const orderTypes = ['Dine In', 'To Go', 'Delivery']

  // Get placeholder image for cart items using SVG data URI
  const getPlaceholderImage = (width, height) => {
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#2D303E"/><circle cx="50%" cy="40%" r="6" fill="#ABBBC2" opacity="0.5"/><rect x="42%" y="52%" width="16%" height="12%" rx="2" fill="#ABBBC2" opacity="0.5"/></svg>`
    return `data:image/svg+xml,${encodeURIComponent(svg)}`
  }

  const updateNote = (itemId, note) => {
    setOrderNotes({ ...orderNotes, [itemId]: note })
  }

  return (
    <aside className="order-summary">
      <div className="order-content">
        <header className="order-header">
          <div className="order-header-top">
            <h2>Orders #34562</h2>
            {onClose && (
              <button className="close-cart-button" onClick={onClose} title="Close">
                ✕
              </button>
            )}
          </div>
          <div className="order-type-tabs">
            {orderTypes.map((type) => (
              <button
                key={type}
                className={`type-tab ${orderType === type ? 'active' : ''}`}
                onClick={() => setOrderType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </header>

        <div className="order-table">
          <div className="table-header">
            <span>Item</span>
            <span>Qty</span>
            <span>Price</span>
          </div>

          <div className="order-items">
            {items.length === 0 ? (
              <div className="empty-cart">No items in cart</div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="order-item">
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
                    <div className="quantity-control">
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="qty-input"
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 0)}
                        min="0"
                      />
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
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
        </div>

        <div className="order-totals">
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

      <button className="payment-button" onClick={onOpenPayment}>Continue to Payment</button>
    </aside>
  )
}

export default OrderSummary

