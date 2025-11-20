import React from 'react'
import SummaryCards from './SummaryCards'
import OrderReport from './OrderReport'
import MostOrdered from './MostOrdered'
import MostTypeOfOrder from './MostTypeOfOrder'
import './Dashboard.css'

function Dashboard() {
  return (
    <div className="dashboard">
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="dashboard-title">
            <h1>Dashboard</h1>
            <p>Tuesday 2 Feb, 2021</p>
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

