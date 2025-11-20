import React, { useState } from 'react'
import SettingsSidebar from './SettingsSidebar'
import ProductsManagement from './ProductsManagement'
import './Settings.css'

function Settings() {
  const [activeSection, setActiveSection] = useState('products')

  return (
    <div className="settings">
      <h1 className="settings-title">Settings</h1>
      <div className="settings-container">
        <SettingsSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <div className="settings-content">
          {activeSection === 'products' && <ProductsManagement />}
          {/* Add other sections here as needed */}
        </div>
      </div>
    </div>
  )
}

export default Settings

