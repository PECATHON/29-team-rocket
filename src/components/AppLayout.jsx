import React from 'react'
import Sidebar from './Sidebar'

function AppLayout({ children }) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  )
}

export default AppLayout

