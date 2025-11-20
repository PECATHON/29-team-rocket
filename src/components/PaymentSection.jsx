import React, { useState } from 'react'
import './PaymentSection.css'

function PaymentSection({ onClose, onPaymentComplete }) {
  const [paymentMethod, setPaymentMethod] = useState('Credit Card')
  const [formData, setFormData] = useState({
    cardholderName: 'Levi Ackerman',
    cardNumber: '2564 1421 0897 1244',
    expirationDate: '02/2022',
    cvv: '•••',
    orderType: 'Dine In',
    tableNo: '140'
  })

  const paymentMethods = ['Credit Card', 'Paypal', 'Cash']

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleConfirmPayment = () => {
    // Handle payment confirmation
    if (onPaymentComplete) {
      onPaymentComplete({
        paymentMethod,
        orderType: formData.orderType,
        tableNo: formData.tableNo
      })
    }
    onClose()
  }

  return (
    <div className="payment-section">
      <div className="payment-content">
        <header className="payment-header">
          <div className="payment-title">
            <h2>Payment</h2>
            <p>3 payment method available</p>
          </div>
          <div className="payment-divider"></div>
        </header>

        <div className="payment-method-section">
          <h3 className="section-title">Payment Method</h3>

          <div className="payment-method-tabs">
            {paymentMethods.map((method) => (
              <button
                key={method}
                className={`payment-method-tab ${paymentMethod === method ? 'active' : ''}`}
                onClick={() => setPaymentMethod(method)}
              >
                {method}
                {paymentMethod === method && (
                  <span className="check-icon">✓</span>
                )}
              </button>
            ))}
          </div>

          {paymentMethod === 'Credit Card' && (
            <div className="payment-forms">
              <div className="form-group">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  className="form-input filled"
                  value={formData.cardholderName}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                  placeholder="Cardholder Name"
                />
              </div>

              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  className="form-input filled"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  placeholder="Card Number"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiration Date</label>
                  <input
                    type="text"
                    className="form-input filled"
                    value={formData.expirationDate}
                    onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                    placeholder="MM/YYYY"
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="password"
                    className="form-input"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    placeholder="•••"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="payment-divider-form"></div>

          <div className="form-row">
            <div className="form-group">
              <label>Order Type</label>
              <select
                className="form-input"
                value={formData.orderType}
                onChange={(e) => handleInputChange('orderType', e.target.value)}
              >
                <option value="Dine In">Dine In</option>
                <option value="To Go">To Go</option>
                <option value="Delivery">Delivery</option>
              </select>
            </div>
            <div className="form-group">
              <label>Table no.</label>
              <input
                type="text"
                className="form-input filled"
                value={formData.tableNo}
                onChange={(e) => handleInputChange('tableNo', e.target.value)}
                placeholder="Table no."
              />
            </div>
          </div>
        </div>

        <div className="payment-actions">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="confirm-button" onClick={handleConfirmPayment}>
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSection

