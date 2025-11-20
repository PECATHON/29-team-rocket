import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user exists in localStorage
    return !!localStorage.getItem('user')
  })

  useEffect(() => {
    // Update authentication state when user changes
    setIsAuthenticated(!!user)
  }, [user])

  const login = (email, password, role) => {
    // Simple authentication - in a real app, this would call an API
    // Accept any email/password for demo purposes
    if (email && password && email.length > 0 && password.length > 0 && role) {
      const userData = {
        email: email,
        name: email.split('@')[0] || (role === 'vendor' ? 'Vendor' : 'Customer'),
        role: role, // 'vendor' or 'customer'
        loginTime: new Date().toISOString()
      }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      setIsAuthenticated(true)
      return { success: true }
    }
    return { success: false, error: 'Please fill in all fields' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    setIsAuthenticated(false)
  }

  const isVendor = user?.role === 'vendor'
  const isCustomer = user?.role === 'customer'

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      isVendor,
      isCustomer
    }}>
      {children}
    </AuthContext.Provider>
  )
}

