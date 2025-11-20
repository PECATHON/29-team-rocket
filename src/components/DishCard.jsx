import React from 'react'
import './DishCard.css'

// Placeholder image generator
const getPlaceholderImage = (width, height) => {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#2D303E"/><circle cx="50%" cy="40%" r="8" fill="#ABBBC2" opacity="0.5"/><rect x="40%" y="50%" width="20%" height="15%" rx="2" fill="#ABBBC2" opacity="0.5"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

function DishCard({ dish }) {
  return (
    <div className="dish-card-settings">
      <div className="dish-card-image">
        <img src={getPlaceholderImage(221, 140)} alt={dish.name} />
      </div>
      <div className="dish-card-content">
        <h3 className="dish-card-name">{dish.name}</h3>
        <div className="dish-card-meta">
          <span className="dish-card-price">$ {dish.price.toFixed(2)}</span>
          <span className="dish-card-dot">•</span>
          <span className="dish-card-available">{dish.available} Bowls</span>
        </div>
      </div>
      <button className="dish-card-edit">
        <span className="edit-icon">✏️</span>
        <span>Edit dish</span>
      </button>
    </div>
  )
}

export default DishCard

