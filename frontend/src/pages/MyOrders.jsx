import React, { useState, useEffect } from 'react';
import { fetchOrderHistory } from '../utils/api';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrderHistory = async () => {
      try {
        const data = await fetchOrderHistory();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    getOrderHistory();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>My Orders</h1>
      {orders.length > 0 ? (
        <div>
          {orders.map((order) => (
            <div key={order._id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px',
              backgroundColor: '#f9f9f9'
            }}>
              <h3>Order ID: {order._id}</h3>
              <p><strong>Total Price:</strong> ${order.totalPrice}</p>
              <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
              <h4>Items:</h4>
              <div style={{ marginLeft: '20px' }}>
                {order.items.map((item, index) => (
                  <div key={`${item.productId.id || item.productId._id}-${index}`} style={{
                    padding: '10px',
                    border: '1px solid #eee',
                    borderRadius: '4px',
                    marginBottom: '8px',
                    backgroundColor: 'white'
                  }}>
                    <p><strong>Product:</strong> {item.productId.name || 'Unknown Product'}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Price:</strong> ${item.price}</p>
                    {item.productId.image && (
                      <img
                        src={item.productId.image}
                        alt={item.productId.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                    )}
                  </div>
                ))}
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

export default MyOrders;