import React, { useState } from 'react'
import './MostTypeOfOrder.css'

function MostTypeOfOrder() {
  const [filter, setFilter] = useState('Today')

  const orderTypes = [
    { name: 'Dine In', count: 200, color: '#FF7CA3' },
    { name: 'To Go', count: 122, color: '#FFB572' },
    { name: 'Delivery', count: 264, color: '#65B0F6' }
  ]

  const total = orderTypes.reduce((sum, type) => sum + type.count, 0)
  const radius = 60
  const circumference = 2 * Math.PI * radius
  let currentOffset = 0

  return (
    <div className="most-type-of-order">
      <div className="most-type-header">
        <h3 className="most-type-title">Most Type of Order</h3>
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

      <div className="donut-chart-container">
        <svg className="donut-chart" width="200" height="200" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#2D303E"
            strokeWidth="20"
          />
          {orderTypes.map((type, index) => {
            const percentage = (type.count / total) * 100
            const strokeDasharray = (circumference * percentage) / 100
            const strokeDashoffset = -currentOffset
            currentOffset += strokeDasharray

            return (
              <circle
                key={index}
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={type.color}
                strokeWidth="20"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 100 100)`}
                className="donut-segment"
              />
            )
          })}
        </svg>
      </div>

      <div className="legend">
        {orderTypes.map((type, index) => (
          <div key={index} className="legend-item">
            <div className="legend-color" style={{ backgroundColor: type.color }}></div>
            <div className="legend-info">
              <span className="legend-name">{type.name}</span>
              <span className="legend-count">{type.count} customers</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MostTypeOfOrder

