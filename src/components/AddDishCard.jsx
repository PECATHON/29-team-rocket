import React from 'react'
import './AddDishCard.css'

function AddDishCard() {
  return (
    <div className="add-dish-card">
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

