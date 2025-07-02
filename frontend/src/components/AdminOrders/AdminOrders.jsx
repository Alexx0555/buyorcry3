import React, { useState, useEffect } from 'react';
import './AdminOrders.css';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const fetchAllOrders = async () => {
        const token = localStorage.getItem('auth-token');
        try {
            const response = await fetch('https://bbuyorcry3.onrender.com/admin/allorders', {
                headers: {
                    'auth-token': token
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                setOrders(data);
            } else {
                console.error('Expected array but got:', data);
                setOrders([]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Failed to fetch orders. Please make sure you are logged in as admin.');
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        const token = localStorage.getItem('auth-token');
        try {
            const response = await fetch('https://bbuyorcry3.onrender.com/admin/update-order-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({
                    orderId: orderId,
                    status: newStatus
                })
            });
            const data = await response.json();
            if (data.success) {
                setOrders(orders.map(order => 
                    order._id === orderId ? { ...order, status: newStatus } : order
                ));
                alert('Order status updated successfully!');
            } else {
                alert('Failed to update order status.');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Failed to update order status.');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return '#ff9800';
            case 'packaging': return '#2196f3';
            case 'shipped': return '#9c27b0';
            case 'delivered': return '#4caf50';
            default: return '#757575';
        }
    };

    if (loading) {
        return <div className="admin-orders-loading">Loading orders...</div>;
    }

    return (
        <div className="admin-orders">
            <h1>Order Management</h1>
            {orders.length > 0 ? (
                <div className="orders-container">
                    {orders.map((order) => (
                        <div key={order._id} className="order-card">
                            <div className="order-header">
                                <h3>Order ID: {order._id}</h3>
                                <div
                                    className="order-status"
                                    style={{ backgroundColor: getStatusColor(order.status || 'pending') }}
                                >
                                    {(order.status || 'pending').toUpperCase()}
                                </div>
                            </div>
                            
                            <div className="order-details">
                                <div className="customer-info">
                                    <h4>Customer Information</h4>
                                    <p><strong>Name:</strong> {order.customerDetails?.name || order.user?.name || 'N/A'}</p>
                                    <p><strong>Email:</strong> {order.customerDetails?.email || order.user?.email || 'N/A'}</p>
                                    <p><strong>Phone:</strong> {order.customerDetails?.phoneNumber || 'N/A'}</p>
                                    <p><strong>Address:</strong> {order.customerDetails?.address || 'N/A'}</p>
                                    <p><strong>Pincode:</strong> {order.customerDetails?.pincode || 'N/A'}</p>
                                </div>
                                
                                <div className="order-info">
                                    <p><strong>Total Price:</strong> ${order.totalPrice}</p>
                                    <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="order-items">
                                <h4>Items:</h4>
                                {order.items && order.items.length > 0 ? order.items.map((item, index) => (
                                    <div key={`${item.productId?.id || item.productId?._id || index}`} className="order-item">
                                        <div className="item-details">
                                            <p><strong>Product:</strong> {item.productId?.name || 'Unknown Product'}</p>
                                            <p><strong>Quantity:</strong> {item.quantity || 0}</p>
                                            <p><strong>Price:</strong> ${item.price || 0}</p>
                                        </div>
                                        {item.productId?.image && (
                                            <img
                                                src={item.productId.image}
                                                alt={item.productId.name || 'Product'}
                                                className="item-image"
                                            />
                                        )}
                                    </div>
                                )) : (
                                    <p>No items found for this order.</p>
                                )}
                            </div>

                            <div className="order-actions">
                                <h4>Update Status:</h4>
                                <div className="status-buttons">
                                    <button
                                        onClick={() => updateOrderStatus(order._id, 'packaging')}
                                        className="status-btn packaging"
                                        disabled={(order.status || 'pending') === 'packaging'}
                                    >
                                        Packaging
                                    </button>
                                    <button
                                        onClick={() => updateOrderStatus(order._id, 'shipped')}
                                        className="status-btn shipped"
                                        disabled={(order.status || 'pending') === 'shipped' || (order.status || 'pending') === 'delivered'}
                                    >
                                        Shipped
                                    </button>
                                    <button
                                        onClick={() => updateOrderStatus(order._id, 'delivered')}
                                        className="status-btn delivered"
                                        disabled={(order.status || 'pending') === 'delivered'}
                                    >
                                        Delivered
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default AdminOrders;
