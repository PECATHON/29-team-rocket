import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import OrderSummary from './components/OrderSummary'
import PaymentModal from './components/PaymentModal'
import Dashboard from './components/Dashboard'
import Settings from './components/Settings'
import History from './components/History'
import './App.css'

function App() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
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

  const handlePaymentComplete = (paymentData) => {
    // Save order to history
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
  }

  return (
    <div className="app">
      <Sidebar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings/*" element={<Settings />} />
        <Route path="/history" element={<History />} />
        <Route
          path="/"
          element={
            <>
              <MainContent onAddToCart={addToCart} />
              <OrderSummary
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                subtotal={subtotal}
                onOpenPayment={() => setShowPaymentModal(true)}
              />
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
          }
        />
      </Routes>
    </div>
  )
}

export default App

