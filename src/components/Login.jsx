import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('vendor') // 'vendor' or 'customer'
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      if (user?.role === 'vendor') {
        navigate('/dashboard', { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    }
  }, [isAuthenticated, user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!role) {
      setError('Please select a login type')
      return
    }

    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const result = login(email, password, role)
      setIsLoading(false)

      if (result.success) {
        // Redirect based on role
        if (role === 'vendor') {
          navigate('/dashboard')
        } else {
          navigate('/')
        }
      } else {
        setError(result.error || 'Invalid credentials')
      }
    }, 500)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <div className="logo-icon-large">🍽️</div>
          </div>
          <p className="login-subtitle">Point of Sale System</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Login As</label>
            <div className="role-selection">
              <button
                type="button"
                className={`role-button ${role === 'vendor' ? 'active' : ''}`}
                onClick={() => setRole('vendor')}
              >
                Vendor
              </button>
              <button
                type="button"
                className={`role-button ${role === 'customer' ? 'active' : ''}`}
                onClick={() => setRole('customer')}
              >
                Customer
              </button>
            </div>
          </div>

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

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <div className="login-hint">
            <p className="hint-note">Use any email and password to login</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

