import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import OrderSummary from './components/OrderSummary'
import PaymentModal from './components/PaymentModal'
import Dashboard from './components/Dashboard'
import Settings from './components/Settings'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('pos') // 'pos', 'dashboard', or 'settings'
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  // Placeholder image generator using SVG data URI
  const getPlaceholderImage = (width, height) => {
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#2D303E"/><circle cx="50%" cy="40%" r="6" fill="#ABBBC2" opacity="0.5"/><rect x="42%" y="52%" width="16%" height="12%" rx="2" fill="#ABBBC2" opacity="0.5"/></svg>`
    return `data:image/svg+xml,${encodeURIComponent(svg)}`
  }

  const [cartItems, setCartItems] = useState([])

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

  return (
    <div className="app">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      {currentView === 'dashboard' ? (
        <Dashboard />
      ) : currentView === 'settings' ? (
        <Settings />
      ) : (
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
            />
          )}
        </>
      )}
    </div>
  )
}

export default App

