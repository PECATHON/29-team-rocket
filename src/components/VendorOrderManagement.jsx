import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrders, updateOrderStatus } from '../api/orders';
import './VendorOrderManagement.css';

function VendorOrderManagement() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending'); // pending, accepted, preparing, ready, all
  const [updating, setUpdating] = useState({});

  useEffect(() => {
    fetchOrders();
    // Refresh every 10 seconds to get new orders
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, [user, filter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const filters = {};
      
      if (user?.vendor_id) {
        filters.vendor_id = user.vendor_id;
      }

      if (filter !== 'all') {
        filters.status = filter;
      }

      const response = await getOrders(filters);
      
      // Sort orders: pending first, then by created_at
      const sortedOrders = (response.orders || []).sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return new Date(b.created_at) - new Date(a.created_at);
      });

      setOrders(sortedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus, notes = '') => {
    try {
      setUpdating(prev => ({ ...prev, [orderId]: true }));
      await updateOrderStatus(orderId, newStatus, notes);
      await fetchOrders(); // Refresh orders
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status: ' + error.message);
    } finally {
      setUpdating(prev => ({ ...prev, [orderId]: false }));
    }
  };

  const handleAccept = (orderId) => {
    if (window.confirm('Accept this order?')) {
      handleStatusUpdate(orderId, 'accepted', 'Order accepted by vendor');
    }
  };

  const handleReject = (orderId) => {
    const reason = window.prompt('Reason for rejection (optional):');
    handleStatusUpdate(orderId, 'rejected', reason || 'Order rejected by vendor');
  };

  const handleStartPreparing = (orderId) => {
    handleStatusUpdate(orderId, 'preparing', 'Order is being prepared');
  };

  const handleMarkReady = (orderId) => {
    if (window.confirm('Mark this order as ready? Customer will be notified.')) {
      handleStatusUpdate(orderId, 'ready', 'Order is ready for pickup/delivery');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'accepted':
      case 'confirmed':
        return 'status-accepted';
      case 'rejected':
      case 'cancelled':
        return 'status-rejected';
      case 'preparing':
        return 'status-preparing';
      case 'ready':
        return 'status-ready';
      case 'delivered':
        return 'status-delivered';
      default:
        return '';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'accepted': return 'Accepted';
      case 'rejected': return 'Rejected';
      case 'confirmed': return 'Confirmed';
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  if (loading && orders.length === 0) {
    return (
      <div className="vendor-order-management">
        <div className="loading-state">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="vendor-order-management">
      <div className="order-management-header">
        <h2 className="order-management-title">Order Management</h2>
        <div className="order-filters">
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({orders.filter(o => o.status === 'pending').length})
          </button>
          <button
            className={`filter-btn ${filter === 'accepted' ? 'active' : ''}`}
            onClick={() => setFilter('accepted')}
          >
            Accepted
          </button>
          <button
            className={`filter-btn ${filter === 'preparing' ? 'active' : ''}`}
            onClick={() => setFilter('preparing')}
          >
            Preparing
          </button>
          <button
            className={`filter-btn ${filter === 'ready' ? 'active' : ''}`}
            onClick={() => setFilter('ready')}
          >
            Ready
          </button>
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Orders
          </button>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <div className="empty-icon">📦</div>
          <p>No orders found</p>
          <p className="empty-subtitle">Orders will appear here when customers place them</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <div className="order-info">
                  <h3 className="order-number">Order #{order.order_number}</h3>
                  <span className="order-date">{formatDate(order.created_at)}</span>
                </div>
                <div className="order-status">
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </div>
              </div>

              <div className="order-items">
                <h4 className="items-title">Items:</h4>
                {order.order_items && order.order_items.length > 0 ? (
                  <ul className="items-list">
                    {order.order_items.map((item, idx) => (
                      <li key={idx} className="order-item">
                        <span className="item-name">
                          {item.menu_items?.name || 'Unknown Item'}
                        </span>
                        <span className="item-quantity">x{item.quantity}</span>
                        <span className="item-price">
                          ₹{parseFloat(item.subtotal).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-items">No items found</p>
                )}
              </div>

              <div className="order-details">
                <div className="detail-row">
                  <span className="detail-label">Total:</span>
                  <span className="detail-value">₹{parseFloat(order.total_amount).toFixed(2)}</span>
                </div>
                {order.order_type && (
                  <div className="detail-row">
                    <span className="detail-label">Type:</span>
                    <span className="detail-value">{order.order_type}</span>
                  </div>
                )}
                {order.table_number && (
                  <div className="detail-row">
                    <span className="detail-label">Table:</span>
                    <span className="detail-value">{order.table_number}</span>
                  </div>
                )}
                {order.delivery_address && (
                  <div className="detail-row">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">{order.delivery_address}</span>
                  </div>
                )}
              </div>

              <div className="order-actions">
                {order.status === 'pending' && (
                  <>
                    <button
                      className="action-btn accept-btn"
                      onClick={() => handleAccept(order.id)}
                      disabled={updating[order.id]}
                    >
                      {updating[order.id] ? 'Processing...' : '✓ Accept'}
                    </button>
                    <button
                      className="action-btn reject-btn"
                      onClick={() => handleReject(order.id)}
                      disabled={updating[order.id]}
                    >
                      {updating[order.id] ? 'Processing...' : '✗ Reject'}
                    </button>
                  </>
                )}

                {order.status === 'accepted' && (
                  <button
                    className="action-btn prepare-btn"
                    onClick={() => handleStartPreparing(order.id)}
                    disabled={updating[order.id]}
                  >
                    {updating[order.id] ? 'Processing...' : 'Start Preparing'}
                  </button>
                )}

                {order.status === 'preparing' && (
                  <button
                    className="action-btn ready-btn"
                    onClick={() => handleMarkReady(order.id)}
                    disabled={updating[order.id]}
                  >
                    {updating[order.id] ? 'Processing...' : '✓ Mark as Ready'}
                  </button>
                )}

                {order.status === 'ready' && (
                  <div className="ready-notification">
                    <span className="ready-icon">✓</span>
                    <span>Customer has been notified</span>
                  </div>
                )}

                {(order.status === 'rejected' || order.status === 'cancelled') && (
                  <div className="rejected-notification">
                    <span>Order {order.status === 'rejected' ? 'rejected' : 'cancelled'}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VendorOrderManagement;

