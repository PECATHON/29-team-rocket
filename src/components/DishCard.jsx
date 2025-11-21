import React, { useState } from 'react'
import { updateMenuItem, deleteMenuItem } from '../api/menuItems'
import './DishCard.css'

// Placeholder image generator
const getPlaceholderImage = (width, height) => {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#2D303E"/><circle cx="50%" cy="40%" r="8" fill="#ABBBC2" opacity="0.5"/><rect x="40%" y="50%" width="20%" height="15%" rx="2" fill="#ABBBC2" opacity="0.5"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

function DishCard({ dish, onUpdated, onDeleted }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [editForm, setEditForm] = useState({
    name: dish.name,
    price: dish.price,
    available_quantity: dish.available,
    description: dish.description || '',
    is_available: dish.is_available !== undefined ? dish.is_available : true
  })

  const handleEdit = async () => {
    if (isEditing) {
      // Save changes
      try {
        await updateMenuItem(dish.id, {
          name: editForm.name,
          price: editForm.price,
          available_quantity: parseInt(editForm.available_quantity),
          description: editForm.description,
          is_available: editForm.is_available
        })
        setIsEditing(false)
        if (onUpdated) onUpdated()
      } catch (error) {
        alert('Failed to update dish: ' + error.message)
      }
    } else {
      setIsEditing(true)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${dish.name}"?`)) {
      return
    }

    setIsDeleting(true)
    try {
      await deleteMenuItem(dish.id)
      if (onDeleted) onDeleted()
    } catch (error) {
      alert('Failed to delete dish: ' + error.message)
      setIsDeleting(false)
    }
  }

  const imageUrl = dish.image_url || getPlaceholderImage(221, 140)

  return (
    <div className="dish-card-settings">
      <div className="dish-card-image">
        <img src={imageUrl} alt={dish.name} />
      </div>
      <div className="dish-card-content">
        {isEditing ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
              type="number"
              step="0.01"
              value={editForm.price}
              onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
              type="number"
              value={editForm.available_quantity}
              onChange={(e) => setEditForm({ ...editForm, available_quantity: parseInt(e.target.value) })}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <label>
              <input
                type="checkbox"
                checked={editForm.is_available}
                onChange={(e) => setEditForm({ ...editForm, is_available: e.target.checked })}
              />
              Available
            </label>
          </div>
        ) : (
          <>
            <h3 className="dish-card-name">{dish.name}</h3>
            <div className="dish-card-meta">
              <span className="dish-card-price">$ {dish.price.toFixed(2)}</span>
              <span className="dish-card-dot">•</span>
              <span className="dish-card-available">{dish.available} Bowls</span>
            </div>
          </>
        )}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
        <button 
          className="dish-card-edit"
          onClick={handleEdit}
          disabled={isDeleting}
        >
          <span className="edit-icon">✏️</span>
          <span>{isEditing ? 'Save' : 'Edit dish'}</span>
        </button>
        {isEditing && (
          <button
            onClick={() => setIsEditing(false)}
            style={{ padding: '0.5rem', background: '#666', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Cancel
          </button>
        )}
        {!isEditing && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            style={{ 
              padding: '0.5rem', 
              background: isDeleting ? '#999' : '#ff4444', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: isDeleting ? 'not-allowed' : 'pointer'
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        )}
      </div>
    </div>
  )
}

export default DishCard
