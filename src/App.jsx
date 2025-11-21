import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainContent from './components/MainContent'
import OrderSummary from './components/OrderSummary'
import PaymentModal from './components/PaymentModal'
import Dashboard from './components/Dashboard'
import Settings from './components/Settings'
import History from './components/History'
import Login from './components/Login'
import FrontPage from './components/FrontPage'
import RestaurantsList from './components/RestaurantsList'
import RestaurantDetail from './components/RestaurantDetail'
import ReviewsRatings from './components/ReviewsRatings'
import ProductsManagement from './components/ProductsManagement'
import ProtectedRoute from './components/ProtectedRoute'
import VendorRoute from './components/VendorRoute'
import AppLayout from './components/AppLayout'
import Chatbot from './components/Chatbot'
import { useAuth } from './context/AuthContext'
import './App.css'

function App() {
  const { isVendor, isAuthenticated } = useAuth()
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showCart, setShowCart] = useState(false)
  // Placeholder image generator using SVG data URI
  const getPlaceholderImage = (width, height) => {
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#2D303E"/><circle cx="50%" cy="40%" r="6" fill="#ABBBC2" opacity="0.5"/><rect x="42%" y="52%" width="16%" height="12%" rx="2" fill="#ABBBC2" opacity="0.5"/></svg>`
    return `data:image/svg+xml,${encodeURIComponent(svg)}`
  }

  const [cartItems, setCartItems] = useState([])
  const [orderNumber, setOrderNumber] = useState(() => {
    // Load last order number from localStorage or start at 34562
    const saved = localStorage.getItem('lastOrderNumber')
    return saved ? parseInt(saved, 10) : 34562
  })

  // Save order to history
  const saveOrderToHistory = (orderData) => {
    const orders = JSON.parse(localStorage.getItem('orderHistory') || '[]')
    const newOrder = {
      id: Date.now().toString(),
      orderNumber: orderNumber.toString().padStart(5, '0'),
      date: new Date().toISOString(),
      items: orderData.items,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod,
      orderType: orderData.orderType,
      tableNo: orderData.tableNo
    }
    orders.unshift(newOrder) // Add to beginning
    localStorage.setItem('orderHistory', JSON.stringify(orders))
    setOrderNumber(orderNumber + 1)
    localStorage.setItem('lastOrderNumber', (orderNumber + 1).toString())
  }

  const addToCart = (dish) => {
    const existingItem = cartItems.find(item => item.id === dish.id)
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === dish.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCartItems([...cartItems, { ...dish, quantity: 1 }])
    }
  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ))
  }

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handlePaymentComplete = async (paymentData) => {
    try {
      // Check if cart items have valid UUIDs (from database)
      // If items have numeric IDs, they're from hardcoded data and won't work with API
      const hasValidIds = cartItems.every(item => {
        // UUIDs are typically 36 characters with dashes, or check if it's a string UUID format
        const idStr = String(item.id)
        return idStr.length > 10 && (idStr.includes('-') || /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idStr))
      })

      if (hasValidIds) {
        // Create order via API
        const { createOrder } = await import('./api/orders')
        
        // Convert cart items to order items format
        const orderItems = cartItems.map(item => ({
          menu_item_id: item.id,
          quantity: item.quantity,
          special_instructions: item.special_instructions || null
        }))

        const orderData = {
          items: orderItems,
          payment_method: paymentData.paymentMethod,
          payment_status: 'paid',
          delivery_address: paymentData.deliveryAddress || null,
          delivery_instructions: paymentData.deliveryInstructions || null,
          order_type: paymentData.orderType || 'delivery',
          table_number: paymentData.tableNo || null
        }

        try {
          await createOrder(orderData)
        } catch (apiError) {
          console.warn('API order creation failed, saving to localStorage only:', apiError)
          // Continue to save to localStorage even if API fails
        }
      } else {
        console.warn('Cart items have invalid IDs (hardcoded data). Saving to localStorage only.')
      }
      
      // Always save to localStorage for backward compatibility
      saveOrderToHistory({
        items: cartItems,
        total: subtotal,
        paymentMethod: paymentData.paymentMethod,
        orderType: paymentData.orderType,
        tableNo: paymentData.tableNo
      })
      
      // Clear cart
      setCartItems([])
      // Close modal
      setShowPaymentModal(false)
    } catch (error) {
      console.error('Error in payment completion:', error)
      // Still save to localStorage even if there's an error
      try {
        saveOrderToHistory({
          items: cartItems,
          total: subtotal,
          paymentMethod: paymentData.paymentMethod,
          orderType: paymentData.orderType,
          tableNo: paymentData.tableNo
        })
        setCartItems([])
        setShowPaymentModal(false)
        alert('Order saved locally. Note: Some items may not be in the database.')
      } catch (localError) {
        alert('Failed to save order: ' + error.message)
      }
    }
  }

  return (
    <div className="app">
      <Chatbot />
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <FrontPage />
            ) : isVendor ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <ProtectedRoute>
                <AppLayout>
                  <>
                    <MainContent
                      onAddToCart={addToCart}
                      onToggleCart={() => setShowCart(!showCart)}
                      cartItemCount={cartItems.length}
                    />
                    {showCart && (
                      <OrderSummary
                        items={cartItems}
                        onUpdateQuantity={updateQuantity}
                        onRemoveItem={removeFromCart}
                        subtotal={subtotal}
                        onOpenPayment={() => setShowPaymentModal(true)}
                        onClose={() => setShowCart(false)}
                      />
                    )}
                    {showPaymentModal && (
                      <PaymentModal
                        items={cartItems}
                        subtotal={subtotal}
                        onClose={() => setShowPaymentModal(false)}
                        onUpdateQuantity={updateQuantity}
                        onRemoveItem={removeFromCart}
                        onPaymentComplete={handlePaymentComplete}
                      />
                    )}
                  </>
                </AppLayout>
              </ProtectedRoute>
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/restaurants"
          element={
            <ProtectedRoute>
              <AppLayout>
                <RestaurantsList />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurants/:id"
          element={
            <ProtectedRoute>
              <AppLayout>
                <RestaurantDetail />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <VendorRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </VendorRoute>
          }
        />
        <Route
          path="/products"
          element={
            <VendorRoute>
              <AppLayout>
                <ProductsManagement />
              </AppLayout>
            </VendorRoute>
          }
        />
        <Route
          path="/settings/*"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Settings />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <AppLayout>
                <History />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ReviewsRatings />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            !isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to={isVendor ? "/dashboard" : "/"} replace />
            )
          }
        />
      </Routes>
    </div>
  )
}

export default App

