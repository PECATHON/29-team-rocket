import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ErrorDialog from './ErrorDialog'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('CUSTOMER') // Default role
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login, signup, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'RESTAURANT_OWNER' || user?.role === 'ADMIN') {
        navigate('/dashboard', { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    }
  }, [isAuthenticated, user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      let result;
      if (isSignup) {
        result = await signup({ name, email, phone, password, role })
      } else {
        result = await login(email, password)
      }

      if (result && result.success) {
        // Navigation handled by useEffect
        setError('') // Clear any previous errors
      } else {
        // Handle login/signup failure
        const errorMessage = result?.error || result?.message || 'Invalid credentials. Please check your email and password and try again.'
        setError(errorMessage)
      }
    } catch (err) {
      // Handle unexpected errors
      const errorMessage = err?.message || err?.error || 'An unexpected error occurred. Please try again.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <div className="logo-icon-large">🍽️</div>
          </div>
          <p className="login-subtitle">
            {isSignup ? 'Create an Account' : 'Login to your Account'}
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  className="form-input"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  className="form-input"
                  placeholder="Enter your phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  className="form-input"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="CUSTOMER">Customer</option>
                  <option value="RESTAURANT_OWNER">Restaurant Owner</option>
                  <option value="DELIVERY_PARTNER">Delivery Partner</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : (isSignup ? 'Sign Up' : 'Login')}
          </button>

          <div className="login-hint">
            <p className="hint-note">
              {isSignup ? 'Already have an account? ' : "Don't have an account? "}
              <button
                type="button"
                className="text-link"
                onClick={() => setIsSignup(!isSignup)}
                style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', textDecoration: 'underline' }}
              >
                {isSignup ? 'Login' : 'Sign Up'}
              </button>
            </p>
          </div>
        </form>
      </div>
      {error && (
        <ErrorDialog
          isOpen={true}
          message={error}
          onClose={() => setError('')}
        />
      )}
    </div>
  )
}

export default Login
