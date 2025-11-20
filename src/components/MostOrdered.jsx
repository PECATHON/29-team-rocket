import React, { useState } from 'react'
import './MostOrdered.css'

function MostOrdered() {
  const [filter, setFilter] = useState('Today')

  // Placeholder image generator
  const getPlaceholderImage = (width, height) => {
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#2D303E"/><circle cx="50%" cy="40%" r="6" fill="#ABBBC2" opacity="0.5"/><rect x="42%" y="52%" width="16%" height="12%" rx="2" fill="#ABBBC2" opacity="0.5"/></svg>`
    return `data:image/svg+xml,${encodeURIComponent(svg)}`
  }

  const mostOrdered = [
    {
      id: 1,
      name: 'Spicy seasoned seafood noodles',
      image: getPlaceholderImage(60, 60),
      count: 200
    },
    {
      id: 2,
      name: 'Salted pasta with mushroom sauce',
      image: getPlaceholderImage(60, 60),
      count: 120
    },
    {
      id: 3,
      name: 'Beef dumpling in hot and sour soup',
      image: getPlaceholderImage(60, 60),
      count: 80
    }
  ]

  return (
    <div className="most-ordered">
      <div className="most-ordered-header">
        <h3 className="most-ordered-title">Most Ordered</h3>
        <select
          className="filter-dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Today">Today</option>
          <option value="Week">This Week</option>
          <option value="Month">This Month</option>
        </select>
      </div>

      <div className="most-ordered-list">
        {mostOrdered.map((item, index) => (
          <div key={item.id} className="most-ordered-item">
            <div className="dish-image-small">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="dish-info-small">
              <p className="dish-name-small">{item.name}</p>
              <p className="dish-count">{item.count} dishes ordered</p>
            </div>
          </div>
        ))}
      </div>

      <button className="view-all-button">View All</button>
    </div>
  )
}

export default MostOrdered

