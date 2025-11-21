import React, { useState, useEffect } from 'react'
import DishCard from './DishCard'
import AddDishCard from './AddDishCard'
import { getMenuItems, getCategories } from '../api/menuItems'
import VendorSetupPrompt from './VendorSetupPrompt'
import { useAuth } from '../context/AuthContext'
import './ProductsManagement.css'

function ProductsManagement() {
  const { user } = useAuth()
  const [menuItems, setMenuItems] = useState([])
  const [categories, setCategories] = useState(['Hot Dishes', 'Cold Dishes', 'Soup', 'Grill', 'Appetizer', 'Dessert'])
  const [activeCategory, setActiveCategory] = useState(categories[0] || 'Hot Dishes')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMenuItems()
    fetchCategories()
  }, [activeCategory, user])

  const fetchMenuItems = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Get vendor_id from user
      const vendorId = user?.vendor_id
      
      if (!vendorId) {
        setError('Vendor ID not found. Please ensure you are logged in as a restaurant owner.')
        setMenuItems([])
        setLoading(false)
        return
      }
      
      const filters = {
        vendor_id: vendorId,
        category: activeCategory
      }

      const response = await getMenuItems(filters)
      setMenuItems(response.menuItems || [])
    } catch (err) {
      console.error('Error fetching menu items:', err)
      setError(err.message)
      setMenuItems([])
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const vendorId = user?.vendor_id
      if (vendorId) {
        const cats = await getCategories(vendorId)
        if (cats && cats.length > 0) {
          setCategories(cats)
          if (!cats.includes(activeCategory)) {
            setActiveCategory(cats[0])
          }
        }
      }
    } catch (err) {
      console.error('Error fetching categories:', err)
      // Keep default categories
    }
  }

  const handleMenuItemUpdated = () => {
    fetchMenuItems()
  }

  const handleMenuItemDeleted = () => {
    fetchMenuItems()
  }

  return (
    <div className="products-management">
      <VendorSetupPrompt />
      <div className="products-header">
        <h2 className="products-title">Products Management</h2>
        <button className="manage-categories-button">
          <span className="filter-icon">🔽</span>
          <span>Manage Categories</span>
        </button>
      </div>

      {error && (
        <div className="error-message" style={{ padding: '1rem', background: '#ff4444', color: 'white', margin: '1rem', borderRadius: '8px' }}>
          {error}
        </div>
      )}

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

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Loading menu items...</p>
        </div>
      ) : (
        <div className="products-grid">
          {user?.vendor_id && (
            <AddDishCard 
              onItemAdded={handleMenuItemUpdated}
              currentCategory={activeCategory}
              vendorId={user.vendor_id}
            />
          )}
          {menuItems.map((item) => (
            <DishCard 
              key={item.id} 
              dish={{
                id: item.id,
                name: item.name,
                price: parseFloat(item.price),
                available: item.available_quantity,
                category: item.category,
                description: item.description,
                image_url: item.image_url,
                is_available: item.is_available
              }}
              onUpdated={handleMenuItemUpdated}
              onDeleted={handleMenuItemDeleted}
            />
          ))}
        </div>
      )}

      <div className="products-actions">
        <button className="discard-button" onClick={fetchMenuItems}>
          Refresh
        </button>
        <button className="save-button" onClick={fetchMenuItems}>
          Refresh
        </button>
      </div>
    </div>
  )
}

export default ProductsManagement
