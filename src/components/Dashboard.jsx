import React from 'react'
import { useAuth } from '../context/AuthContext'
import SummaryCards from './SummaryCards'
import OrderReport from './OrderReport'
import VendorOrderManagement from './VendorOrderManagement'
import VendorSetupPrompt from './VendorSetupPrompt'
import MostOrdered from './MostOrdered'
import MostTypeOfOrder from './MostTypeOfOrder'
import CustomerSummaryCards from './CustomerSummaryCards'
import CustomerOrderHistory from './CustomerOrderHistory'
import './Dashboard.css'

function Dashboard() {
  const { isVendor, isCustomer, user } = useAuth()
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

  // Since this route is protected by VendorRoute, we should only show vendor content
  // But keep customer check as fallback in case component is used elsewhere

  if (isCustomer && !isVendor) {
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

  // Vendor dashboard (default for /dashboard route)
  return (
    <div className="dashboard">
      <VendorSetupPrompt />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="dashboard-title">
            <h1>Dashboard</h1>
            <p>{currentDate}</p>
          </div>
        </header>

        <SummaryCards />

        {user?.vendor_id ? (
          <VendorOrderManagement />
        ) : (
          <div className="vendor-setup-message">
            <div className="setup-icon">⚠️</div>
            <h3>Vendor Profile Required</h3>
            <p>Please complete your vendor profile setup to manage orders and menu items.</p>
            <p className="setup-hint">If you see a setup form, please fill it out. Otherwise, refresh the page.</p>
          </div>
        )}
      </main>

      <aside className="dashboard-right-panel">
        <MostOrdered />
        <MostTypeOfOrder />
      </aside>
    </div>
  )
}

export default Dashboard

