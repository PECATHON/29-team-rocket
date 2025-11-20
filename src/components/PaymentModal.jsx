import React, { useState } from 'react'
import ConfirmationSection from './ConfirmationSection'
import PaymentSection from './PaymentSection'
import './PaymentModal.css'

function PaymentModal({ items, subtotal, onClose, onUpdateQuantity, onRemoveItem }) {
  return (
    <div className="payment-modal-overlay" onClick={onClose}>
      <div className="payment-modal-popup" onClick={(e) => e.stopPropagation()}>
        <div className="payment-modal-content">
          <ConfirmationSection
            items={items}
            subtotal={subtotal}
            onClose={onClose}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
          />
          <PaymentSection onClose={onClose} />
        </div>
      </div>
    </div>
  )
}

export default PaymentModal

