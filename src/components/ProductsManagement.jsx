import React, { useState } from 'react'
import DishCard from './DishCard'
import AddDishCard from './AddDishCard'
import './ProductsManagement.css'

function ProductsManagement() {
  const [activeCategory, setActiveCategory] = useState('Hot Dishes')

  const categories = ['Hot Dishes', 'Cold Dishes', 'Soup', 'Grill', 'Appetizer', 'Dessert']

  const dishes = [
    {
      id: 1,
      name: 'Spicy seasoned seafood noodles',
      price: 2.29,
      available: 20,
      category: 'Hot Dishes'
    },
    {
      id: 2,
      name: 'Salted Pasta with mushroom sauce',
      price: 2.69,
      available: 30,
      category: 'Hot Dishes'
    },
    {
      id: 3,
      name: 'Salted Pasta with mushroom sauce',
      price: 2.69,
      available: 20,
      category: 'Hot Dishes'
    },
    {
      id: 4,
      name: 'Salted Pasta with mushroom sauce',
      price: 2.69,
      available: 20,
      category: 'Hot Dishes'
    },
    {
      id: 5,
      name: 'Salted Pasta with mushroom sauce',
      price: 2.69,
      available: 20,
      category: 'Hot Dishes'
    },
    {
      id: 6,
      name: 'Beef dumpling in hot and sour soup',
      price: 2.99,
      available: 16,
      category: 'Hot Dishes'
    },
    {
      id: 7,
      name: 'Healthy noodle with spinach leaf',
      price: 3.29,
      available: 22,
      category: 'Hot Dishes'
    }
  ]

  const filteredDishes = dishes.filter(dish => dish.category === activeCategory)

  return (
    <div className="products-management">
      <div className="products-header">
        <h2 className="products-title">Products Management</h2>
        <button className="manage-categories-button">
          <span className="filter-icon">🔽</span>
          <span>Manage Categories</span>
        </button>
      </div>

      <div className="products-categories">
        <div className="category-tabs">
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
      </div>

      <div className="products-grid">
        <AddDishCard />
        {filteredDishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>

      <div className="products-actions">
        <button className="discard-button">Discard Changes</button>
        <button className="save-button">Save Changes</button>
      </div>
    </div>
  )
}

export default ProductsManagement

