import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './RestaurantDetail.css'

// Placeholder image generator
const getPlaceholderImage = (width, height) => {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#2D303E"/><circle cx="50%" cy="40%" r="8" fill="#ABBBC2" opacity="0.5"/><rect x="40%" y="50%" width="20%" height="15%" rx="2" fill="#ABBBC2" opacity="0.5"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

// Restaurant data with real photos (same as RestaurantsList)
const restaurants = [
  {
    id: 1,
    name: 'The Spice Garden',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop',
    rating: 4.5,
    vegType: 'Both',
    openingTime: '10:00 AM',
    closingTime: '11:00 PM',
    description: 'A delightful fusion of spices and flavors from around the world. Experience authentic cuisine in a warm and welcoming atmosphere.',
    address: '123 Main Street, City Center',
    phone: '+1 (555) 123-4567'
  },
  {
    id: 2,
    name: 'Ocean Breeze Seafood',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=600&fit=crop',
    rating: 4.8,
    vegType: 'Non-Veg',
    openingTime: '11:00 AM',
    closingTime: '10:00 PM',
    description: 'Fresh seafood prepared with the finest ingredients. Our chefs bring the ocean to your plate with every dish.',
    address: '456 Coastal Avenue, Beach District',
    phone: '+1 (555) 234-5678'
  },
  {
    id: 3,
    name: 'Green Leaf Cafe',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=600&fit=crop',
    rating: 4.3,
    vegType: 'Veg',
    openingTime: '8:00 AM',
    closingTime: '9:00 PM',
    description: 'Healthy and delicious vegetarian cuisine made with organic ingredients. Perfect for breakfast, lunch, or dinner.',
    address: '789 Garden Lane, Park Area',
    phone: '+1 (555) 345-6789'
  },
  {
    id: 4,
    name: 'BBQ Masters',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&h=600&fit=crop',
    rating: 4.7,
    vegType: 'Non-Veg',
    openingTime: '12:00 PM',
    closingTime: '11:00 PM',
    description: 'The ultimate destination for barbecue lovers. Slow-cooked meats and savory sides that will satisfy your cravings.',
    address: '321 Grill Street, Downtown',
    phone: '+1 (555) 456-7890'
  },
  {
    id: 5,
    name: 'Vegan Delight',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=600&fit=crop',
    rating: 4.6,
    vegType: 'Veg',
    openingTime: '9:00 AM',
    closingTime: '8:00 PM',
    description: 'Plant-based cuisine that doesn\'t compromise on taste. Creative vegan dishes that will surprise and delight.',
    address: '654 Plant Avenue, Green District',
    phone: '+1 (555) 567-8901'
  },
  {
    id: 6,
    name: 'Italian Corner',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=600&fit=crop',
    rating: 4.4,
    vegType: 'Both',
    openingTime: '11:00 AM',
    closingTime: '10:00 PM',
    description: 'Authentic Italian flavors in the heart of the city. From pasta to pizza, experience true Italian hospitality.',
    address: '987 Pasta Road, Little Italy',
    phone: '+1 (555) 678-9012'
  },
  {
    id: 7,
    name: 'Dragon Wok',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=1200&h=600&fit=crop',
    rating: 4.5,
    vegType: 'Both',
    openingTime: '10:30 AM',
    closingTime: '10:30 PM',
    description: 'Traditional and modern Chinese cuisine. Wok-fried perfection with bold flavors and fresh ingredients.',
    address: '147 Wok Street, Chinatown',
    phone: '+1 (555) 789-0123'
  },
  {
    id: 8,
    name: 'Meat Lovers Paradise',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=1200&h=600&fit=crop',
    rating: 4.9,
    vegType: 'Non-Veg',
    openingTime: '12:00 PM',
    closingTime: '11:30 PM',
    description: 'For those who appreciate premium cuts and expertly prepared meats. A carnivore\'s dream come true.',
    address: '258 Steak Boulevard, Meat District',
    phone: '+1 (555) 890-1234'
  },
  {
    id: 9,
    name: 'Fresh & Healthy',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=600&fit=crop',
    rating: 4.2,
    vegType: 'Veg',
    openingTime: '7:00 AM',
    closingTime: '9:00 PM',
    description: 'Nutritious meals that fuel your body and satisfy your taste buds. Fresh ingredients, simple preparation.',
    address: '369 Wellness Way, Health Quarter',
    phone: '+1 (555) 901-2345'
  },
  {
    id: 10,
    name: 'Coastal Kitchen',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=600&fit=crop',
    rating: 4.6,
    vegType: 'Both',
    openingTime: '10:00 AM',
    closingTime: '10:00 PM',
    description: 'Coastal cuisine with a modern twist. Fresh seafood and local ingredients in a relaxed beachside atmosphere.',
    address: '741 Ocean Drive, Seaside',
    phone: '+1 (555) 012-3456'
  },
  {
    id: 11,
    name: 'Tandoor Express',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200&h=600&fit=crop',
    rating: 4.7,
    vegType: 'Both',
    openingTime: '11:00 AM',
    closingTime: '11:00 PM',
    description: 'Fast and flavorful Indian cuisine. Tandoor-cooked dishes with aromatic spices and traditional recipes.',
    address: '852 Spice Road, Curry Corner',
    phone: '+1 (555) 123-4567'
  },
  {
    id: 12,
    name: 'Sushi House',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&h=600&fit=crop',
    rating: 4.8,
    vegType: 'Non-Veg',
    openingTime: '12:00 PM',
    closingTime: '10:00 PM',
    description: 'Authentic Japanese sushi and sashimi. Master chefs prepare each piece with precision and care.',
    address: '963 Sushi Street, Japan Town',
    phone: '+1 (555) 234-5678'
  }
]

function RestaurantDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const restaurant = restaurants.find(r => r.id === parseInt(id))

  if (!restaurant) {
    return (
      <div className="restaurant-detail-page">
        <div className="restaurant-not-found">
          <h2>Restaurant not found</h2>
          <button onClick={() => navigate('/restaurants')} className="back-button">
            Back to Restaurants
          </button>
        </div>
      </div>
    )
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
    <div className="restaurant-detail-page">
      <button onClick={() => navigate('/restaurants')} className="back-button">
        ← Back to Restaurants
      </button>

      <div className="restaurant-hero">
        <div className="restaurant-hero-image">
          <img src={restaurant.image} alt={restaurant.name} />
          <div
            className="detail-veg-type-badge"
            style={{ backgroundColor: getVegTypeColor(restaurant.vegType) }}
          >
            <span className="veg-type-icon">{getVegTypeIcon(restaurant.vegType)}</span>
            <span className="veg-type-text">{restaurant.vegType}</span>
          </div>
        </div>
      </div>

      <div className="restaurant-detail-content">
        <div className="restaurant-detail-header">
          <div>
            <h1 className="restaurant-detail-name">{restaurant.name}</h1>
            <div className="restaurant-detail-rating">
              <span className="rating-star">⭐</span>
              <span className="rating-value">{restaurant.rating}</span>
            </div>
          </div>
        </div>

        <div className="restaurant-detail-info">
          <div className="info-section">
            <h3 className="info-section-title">About</h3>
            <p className="info-section-content">{restaurant.description}</p>
          </div>

          <div className="info-section">
            <h3 className="info-section-title">Timings</h3>
            <p className="info-section-content">
              <span className="timing-icon">🕐</span>
              {restaurant.openingTime} - {restaurant.closingTime}
            </p>
          </div>

          <div className="info-section">
            <h3 className="info-section-title">Address</h3>
            <p className="info-section-content">
              <span className="address-icon">📍</span>
              {restaurant.address}
            </p>
          </div>

          <div className="info-section">
            <h3 className="info-section-title">Contact</h3>
            <p className="info-section-content">
              <span className="phone-icon">📞</span>
              {restaurant.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantDetail

