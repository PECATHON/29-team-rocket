import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MainContent.css'
import noodlesImg from '../assets/noodles.png';
import pasta from '../assets/veg_pasta.png';
import manchurian from '../assets/vegm.png';
import bhature from '../assets/chole.png';
import bhaji from '../assets/pav.png';
import dosa from '../assets/sambar.png';




// Placeholder image generator using SVG data URI
const getPlaceholderImage = (width, height) => {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#2D303E"/><circle cx="50%" cy="40%" r="8" fill="#ABBBC2" opacity="0.5"/><rect x="40%" y="50%" width="20%" height="15%" rx="2" fill="#ABBBC2" opacity="0.5"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const dishes = [
  { id: 1, name: 'Spicy seasoned noodles', price: 2.29, available: 20, image: noodlesImg, category: 'Hot Dishes' },
  { id: 2, name: 'Salted Pasta with mushroom sauce', price: 2.69, available: 11, image: pasta, category: 'Hot Dishes' },
  { id: 3, name: 'Veg Manchurian', price: 2.99, available: 16, image: manchurian, category: 'Hot Dishes' },
  { id: 4, name: 'Chole Bhature', price: 3.29, available: 22, image: bhature, category: 'Hot Dishes' },
  { id: 5, name: 'Pav Bhaji', price: 3.49, available: 13, image: bhaji, category: 'Hot Dishes' },
  { id: 6, name: 'Sambar Dosa', price: 3.59, available: 17, image: dosa, category: 'Hot Dishes' },
]

const categories = ['Hot Dishes', 'Cold Dishes', 'Soup', 'Grill', 'Appetizer', 'Dessert']

function MainContent({ onAddToCart, onToggleCart, cartItemCount }) {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('Hot Dishes')
  const [selectedFilter, setSelectedFilter] = useState('Dine In')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDishes = dishes.filter(dish => {
    const matchesCategory = dish.category === activeCategory
    const matchesSearch = searchQuery === '' ||
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="main-content">
      <header className="main-header">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for food, coffee, etc.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <button className="cart-toggle-button" onClick={onToggleCart}>
          <span className="cart-icon">🛒</span>
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </button>
      </header>

      {/* Restaurant Icon/Button */}
      <div className="flex justify-center items-center my-4">
        <button
          onClick={() => navigate('/restaurants')}
          className="flex flex-row items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-[#EA7C69] to-[#e66b55] border-none rounded-lg cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:scale-105 active:scale-100 group"
        >
          <span className="text-2xl leading-none group-hover:scale-110 transition-transform">🍽️</span>
          <span className="text-sm font-semibold text-white">Browse Restaurants</span>
        </button>
      </div>

      <nav className="category-nav">
        <div className="category-list">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="category-divider"></div>
      </nav>

      <div className="menu-section">
        <div className="menu-header">
          <h2>Choose Dishes</h2>
          <select
            className="filter-dropdown"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="Dine In">Dine In</option>
            <option value="To Go">To Go</option>
            <option value="Delivery">Delivery</option>
          </select>
        </div>

        <div className="dishes-grid">
          {filteredDishes.map((dish) => (
            <div key={dish.id} className="dish-card" onClick={() => onAddToCart(dish)}>
              <div className="dish-image">
                <img src={dish.image} alt={dish.name} />
              </div>
              <div className="dish-info">
                <h3 className="dish-name">{dish.name}</h3>
                <div className="dish-price">${dish.price.toFixed(2)}</div>
                <div className="dish-available">{dish.available} Bowls available</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default MainContent

