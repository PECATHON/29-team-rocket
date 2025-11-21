import React from 'react'
import { useNavigate } from 'react-router-dom'
import './RestaurantsList.css'

// Placeholder image generator
const getPlaceholderImage = (width, height) => {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#2D303E"/><circle cx="50%" cy="40%" r="8" fill="#ABBBC2" opacity="0.5"/><rect x="40%" y="50%" width="20%" height="15%" rx="2" fill="#ABBBC2" opacity="0.5"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

// Restaurant data with real photos
const restaurants = [
  {
    id: 1,
    name: 'The Spice Garden',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    rating: 4.5,
    vegType: 'Both',
    openingTime: '10:00 AM',
    closingTime: '11:00 PM'
  },
  {
    id: 2,
    name: 'Ocean Breeze Seafood',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop',
    rating: 4.8,
    vegType: 'Non-Veg',
    openingTime: '11:00 AM',
    closingTime: '10:00 PM'
  },
  {
    id: 3,
    name: 'Green Leaf Cafe',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
    rating: 4.3,
    vegType: 'Veg',
    openingTime: '8:00 AM',
    closingTime: '9:00 PM'
  },
  {
    id: 4,
    name: 'BBQ Masters',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop',
    rating: 4.7,
    vegType: 'Non-Veg',
    openingTime: '12:00 PM',
    closingTime: '11:00 PM'
  },
  {
    id: 5,
    name: 'Vegan Delight',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
    rating: 4.6,
    vegType: 'Veg',
    openingTime: '9:00 AM',
    closingTime: '8:00 PM'
  },
  {
    id: 6,
    name: 'Italian Corner',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
    rating: 4.4,
    vegType: 'Both',
    openingTime: '11:00 AM',
    closingTime: '10:00 PM'
  },
  {
    id: 7,
    name: 'Dragon Wok',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&h=600&fit=crop',
    rating: 4.5,
    vegType: 'Both',
    openingTime: '10:30 AM',
    closingTime: '10:30 PM'
  },
  {
    id: 8,
    name: 'Meat Lovers Paradise',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&h=600&fit=crop',
    rating: 4.9,
    vegType: 'Non-Veg',
    openingTime: '12:00 PM',
    closingTime: '11:30 PM'
  },
  {
    id: 9,
    name: 'Fresh & Healthy',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop',
    rating: 4.2,
    vegType: 'Veg',
    openingTime: '7:00 AM',
    closingTime: '9:00 PM'
  },
  {
    id: 10,
    name: 'Coastal Kitchen',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop',
    rating: 4.6,
    vegType: 'Both',
    openingTime: '10:00 AM',
    closingTime: '10:00 PM'
  },
  {
    id: 11,
    name: 'Tandoor Express',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop',
    rating: 4.7,
    vegType: 'Both',
    openingTime: '11:00 AM',
    closingTime: '11:00 PM'
  },
  {
    id: 12,
    name: 'Sushi House',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop',
    rating: 4.8,
    vegType: 'Non-Veg',
    openingTime: '12:00 PM',
    closingTime: '10:00 PM'
  }
]

function RestaurantsList() {
  const navigate = useNavigate()

  const handleRestaurantClick = (id) => {
    navigate(`/restaurants/${id}`)
  }

  const getVegTypeColor = (vegType) => {
    if (vegType === 'Veg') return '#4CAF50'
    if (vegType === 'Non-Veg') return '#F44336'
    return '#FF9800'
  }

  const getVegTypeIcon = (vegType) => {
    if (vegType === 'Veg') return '🥬'
    if (vegType === 'Non-Veg') return '🍖'
    return '🍽️'
  }

  return (
    <div className="restaurants-list-page">
      <div className="restaurants-header">
        <h1 className="restaurants-title">Restaurants</h1>
        <p className="restaurants-subtitle">Discover amazing places to dine</p>
      </div>

      <div className="restaurants-grid">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="restaurant-card"
            onClick={() => handleRestaurantClick(restaurant.id)}
          >
            <div className="restaurant-image-container">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="restaurant-image"
              />
              <div
                className="veg-type-badge"
                style={{ backgroundColor: getVegTypeColor(restaurant.vegType) }}
              >
                <span className="veg-type-icon">{getVegTypeIcon(restaurant.vegType)}</span>
                <span className="veg-type-text">{restaurant.vegType}</span>
              </div>
            </div>
            <div className="restaurant-info">
              <h3 className="restaurant-name">{restaurant.name}</h3>
              <div className="restaurant-rating">
                <span className="rating-star">⭐</span>
                <span className="rating-value">{restaurant.rating}</span>
              </div>
              <div className="restaurant-timing">
                <span className="timing-icon">🕐</span>
                <span className="timing-text">
                  {restaurant.openingTime} - {restaurant.closingTime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RestaurantsList

