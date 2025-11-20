import React from 'react'
import { createPortal } from 'react-dom'
import './ErrorDialog.css'

function ErrorDialog({ isOpen, message, onClose }) {
  if (!isOpen) return null

  const dialogContent = (
    <div className="error-dialog-overlay" onClick={onClose}>
      <div className="error-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="error-dialog-header">
          <div className="error-icon">⚠️</div>
          <h3 className="error-dialog-title">Authentication Error</h3>
        </div>
        <div className="error-dialog-body">
          <p className="error-dialog-message">{message}</p>
        </div>
        <div className="error-dialog-footer">
          <button className="error-dialog-button" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  )

  return createPortal(dialogContent, document.body)
}

export default ErrorDialog

