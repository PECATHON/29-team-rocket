import React from 'react'
import './OrderReport.css'

function OrderReport() {
  const orders = [
    {
      id: 1,
      customer: 'Eren Jaegar',
      menu: 'Spicy seasoned seafood noodles',
      totalPayment: '₹125',
      status: 'Completed'
    },
    {
      id: 2,
      customer: 'Reiner Braunn',
      menu: 'Salted Pasta with mushroom sauce',
      totalPayment: '₹145',
      status: 'Preparing'
    },
    {
      id: 3,
      customer: 'Levi Ackerman',
      menu: 'Beef dumpling in hot and sour soup',
      totalPayment: '₹105',
      status: 'Pending'
    },
    {
      id: 4,
      customer: 'Historia Reiss',
      menu: 'Hot spicy fried rice with omelet',
      totalPayment: '₹45',
      status: 'Completed'
    },
    {
      id: 5,
      customer: 'Hanji Zoe',
      menu: 'Hot spicy fried rice with omelet',
      totalPayment: '₹245',
      status: 'Completed'
    },
    {
      id: 6,
      customer: 'Armin Arlort',
      menu: 'Hot spicy fried rice',
      totalPayment: '₹435',
      status: 'Completed'
    }
  ]

  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'status-completed'
      case 'Preparing':
        return 'status-preparing'
      case 'Pending':
        return 'status-pending'
      default:
        return ''
    }
  }

  return (
    <div className="order-report">
      <div className="order-report-header">
        <h2 className="order-report-title">Order Report</h2>
        <button className="filter-button">Filter Order</button>
      </div>

      <div className="order-report-table">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Menu</th>
              <th>Total Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="customer-cell">
                  <div className="customer-avatar">
                    {order.customer.charAt(0)}
                  </div>
                  <span className="customer-name">{order.customer}</span>
                </td>
                <td className="menu-cell">{order.menu}</td>
                <td className="payment-cell">{order.totalPayment}</td>
                <td className="status-cell">
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderReport

