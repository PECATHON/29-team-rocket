import React from 'react'
import './SummaryCards.css'

function SummaryCards() {
  const cards = [
    {
      id: 1,
      title: 'Total Revenue',
      value: '$10,243.00',
      change: '+32.40%',
      trend: 'up',
      icon: '💰'
    },
    {
      id: 2,
      title: 'Total Dish Ordered',
      value: '23,456',
      change: '-12.40%',
      trend: 'down',
      icon: '🍽️'
    },
    {
      id: 3,
      title: 'Total Customer',
      value: '1,234',
      change: '+2.40%',
      trend: 'up',
      icon: '👥'
    }
  ]

  return (
    <div className="summary-cards">
      {cards.map((card) => (
        <div key={card.id} className="summary-card">
          <div className="card-icon">{card.icon}</div>
          <div className="card-content">
            <p className="card-title">{card.title}</p>
            <h3 className="card-value">{card.value}</h3>
            <div className={`card-change ${card.trend}`}>
              <span className="change-icon">{card.trend === 'up' ? '↑' : '↓'}</span>
              <span>{card.change}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SummaryCards

