import React, { useState } from 'react'
import { createMenuItem } from '../api/menuItems'
import './AddDishCard.css'

function AddDishCard({ onItemAdded, currentCategory, vendorId }) {
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: currentCategory || 'Hot Dishes',
    available_quantity: 0,
    is_available: true,
    image_url: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAdd = async () => {
    if (isAdding) {
      // Validate form
      if (!formData.name || !formData.price || !formData.category) {
        setError('Name, price, and category are required')
        return
      }

      if (!vendorId) {
        setError('Vendor ID is required. Please ensure you are logged in as a restaurant owner.')
        return
      }

      setLoading(true)
      setError(null)

      try {
        await createMenuItem({
          ...formData,
          price: parseFloat(formData.price),
          available_quantity: parseInt(formData.available_quantity) || 0,
          vendor_id: vendorId
        })
        
        // Reset form
        setFormData({
          name: '',
          description: '',
          price: '',
          category: currentCategory || 'Hot Dishes',
          available_quantity: 0,
          is_available: true,
          image_url: ''
        })
        setIsAdding(false)
        
        if (onItemAdded) {
          onItemAdded()
        }
      } catch (err) {
        setError(err.message || 'Failed to create menu item')
      } finally {
        setLoading(false)
      }
    } else {
      setIsAdding(true)
      setError(null)
    }
  }

  // Update category when currentCategory changes
  React.useEffect(() => {
    if (currentCategory) {
      setFormData(prev => ({ ...prev, category: currentCategory }))
    }
  }, [currentCategory])

  if (isAdding) {
    return (
      <div className="add-dish-card" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0 }}>Add New Dish</h3>
          
          {error && (
            <div style={{ padding: '0.5rem', background: '#ff4444', color: 'white', borderRadius: '4px', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <input
            type="text"
            placeholder="Dish Name *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          <textarea
            placeholder="Description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minHeight: '60px' }}
          />

          <input
            type="number"
            step="0.01"
            placeholder="Price *"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          <input
            type="text"
            placeholder="Category *"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          <input
            type="number"
            placeholder="Available Quantity"
            value={formData.available_quantity}
            onChange={(e) => setFormData({ ...formData, available_quantity: parseInt(e.target.value) || 0 })}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          <input
            type="text"
            placeholder="Image URL (optional)"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={formData.is_available}
              onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
            />
            Available
          </label>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleAdd}
              disabled={loading}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: loading ? '#999' : '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Adding...' : 'Add Dish'}
            </button>
            <button
              onClick={() => {
                setIsAdding(false)
                setError(null)
              }}
              disabled={loading}
              style={{
                padding: '0.75rem 1rem',
                background: '#666',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="add-dish-card" onClick={handleAdd} style={{ cursor: 'pointer' }}>
      <div className="add-dish-content">
        <div className="add-dish-icon">
          <span className="plus-icon">+</span>
        </div>
        <p className="add-dish-text">Add new dish</p>
      </div>
    </div>
  )
}

export default AddDishCard
