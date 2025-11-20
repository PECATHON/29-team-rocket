import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SettingsSidebar from './SettingsSidebar'
import MenuAppearance from './MenuAppearance'
import YourRestaurant from './YourRestaurant'
import ProductsManagement from './ProductsManagement'
import Notification from './Notification'
import Security from './Security'
import AboutUs from './AboutUs'
import './Settings.css'

function Settings() {
  return (
    <div className="settings">
      <h1 className="settings-title">Settings</h1>
      <div className="settings-container">
        <SettingsSidebar />
        <div className="settings-content">
          <Routes>
            <Route path="appearance" element={<MenuAppearance />} />
            <Route path="restaurant" element={<YourRestaurant />} />
            <Route path="products" element={<ProductsManagement />} />
            <Route path="notifications" element={<Notification />} />
            <Route path="security" element={<Security />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="" element={<Navigate to="appearance" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Settings

