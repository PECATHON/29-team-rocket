import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function VendorRoute({ children }) {
  const { isAuthenticated, isVendor } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isVendor) {
    // Redirect customers to POS page
    return <Navigate to="/" replace />
  }

  return children
}

export default VendorRoute

