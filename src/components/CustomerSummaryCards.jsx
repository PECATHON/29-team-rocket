import React, { useState, useEffect } from 'react'
import './SummaryCards.css'

function CustomerSummaryCards() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    favoriteCategory: 'N/A'
  })

  useEffect(() => {
    // Load order history from localStorage
    const orders = JSON.parse(localStorage.getItem('orderHistory') || '[]')

    const totalOrders = orders.length
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0)

    // Calculate favorite category (most ordered item type)
    const categoryCount = {}
    orders.forEach(order => {
      order.items.forEach(item => {
        // Simple category detection based on item name
        if (item.name.toLowerCase().includes('noodle') || item.name.toLowerCase().includes('pasta')) {
          categoryCount['Noodles & Pasta'] = (categoryCount['Noodles & Pasta'] || 0) + item.quantity
        } else if (item.name.toLowerCase().includes('soup')) {
          categoryCount['Soup'] = (categoryCount['Soup'] || 0) + item.quantity
        } else if (item.name.toLowerCase().includes('rice')) {
          categoryCount['Rice'] = (categoryCount['Rice'] || 0) + item.quantity
        } else {
          categoryCount['Other'] = (categoryCount['Other'] || 0) + item.quantity
        }
      })
    })

    const favoriteCategory = Object.keys(categoryCount).length > 0
      ? Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0][0]
      : 'N/A'

    setStats({
      totalOrders,
      totalSpent,
      favoriteCategory
    })
  }, [])

  const cards = [
    {
      id: 1,
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      change: '',
      trend: 'neutral',
      icon: '📦'
    },
    {
      id: 2,
      title: 'Total Spent',
      value: `$${stats.totalSpent.toFixed(2)}`,
      change: '',
      trend: 'neutral',
      icon: '💳'
    },
    {
      id: 3,
      title: 'Favorite Category',
      value: stats.favoriteCategory,
      change: '',
      trend: 'neutral',
      icon: '⭐'
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
            {card.change && (
              <div className={`card-change ${card.trend}`}>
                <span className="change-icon">{card.trend === 'up' ? '↑' : '↓'}</span>
                <span>{card.change}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CustomerSummaryCards

