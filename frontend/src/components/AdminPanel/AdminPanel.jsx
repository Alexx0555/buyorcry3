import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
    const [productId, setProductId] = useState('');

    const handleViewProducts = async () => {
        const token = localStorage.getItem('auth-token');
        try {
            const response = await fetch('http://localhost:4000/admin/allproducts', {
                headers: {
                    'auth-token': token
                }
            });
            const data = await response.json();
            alert(JSON.stringify(data));
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to view products.');
        }
    };

    const handleDeleteProduct = async () => {
        const token = localStorage.getItem('auth-token');
        try {
            const response = await fetch('http://localhost:4000/admin/removeproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({
                    id: productId
                })
            });
            const data = await response.json();
            alert('Product deleted successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to delete product.');
        }
    };

    return (
        <div>
            <Link to="/addproduct">
                <button>Add Product</button>
            </Link>

            <Link to="/admin/products">
                <button>View Products</button>
            </Link>
        </div>
    );
};

export default AdminPanel;