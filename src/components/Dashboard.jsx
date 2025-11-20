import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import SummaryCards from './SummaryCards'
import OrderReport from './OrderReport'
import MostOrdered from './MostOrdered'
import MostTypeOfOrder from './MostTypeOfOrder'
import CustomerSummaryCards from './CustomerSummaryCards'
import CustomerOrderHistory from './CustomerOrderHistory'
import './Dashboard.css'

function Dashboard() {
  const { isCustomer } = useAuth()
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

  if (isCustomer) {
    return (
      <div className="dashboard">
        <main className="dashboard-main">
          <header className="dashboard-header">
            <div className="dashboard-title">
              <h1>My Dashboard</h1>
              <p>{currentDate}</p>
            </div>
          </header>

          <CustomerSummaryCards />

          <CustomerOrderHistory />
        </main>

        <aside className="dashboard-right-panel">
          <MostOrdered />
        </aside>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="dashboard-title">
            <h1>Dashboard</h1>
            <p>{currentDate}</p>
          </div>
        </header>

        <SummaryCards />

        <OrderReport />
      </main>

      <aside className="dashboard-right-panel">
        <MostOrdered />
        <MostTypeOfOrder />
      </aside>
    </div>
  )
}

export default Dashboard

