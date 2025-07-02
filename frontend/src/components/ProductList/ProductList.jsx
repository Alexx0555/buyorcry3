import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
 
    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('auth-token');
            try {
                const response = await fetch('https://bbuyorcry3.onrender.com/admin/allproducts', {
                    headers: {
                        'auth-token': token
                    }
                });
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to view products.');
            }
        };

        fetchProducts();
    }, []);

    const handleDeleteProduct = async (productId) => {
        const token = localStorage.getItem('auth-token');
        try {
            const response = await fetch('https://bbuyorcry3.onrender.com/admin/removeproduct', {
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
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to delete product.');
        }
    };

    const handleToggleStock = async (productId, currentOutOfStock) => {
        const token = localStorage.getItem('auth-token');
        try {
            const response = await fetch('https://bbuyorcry3.onrender.com/admin/toggle-stock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({
                    productId: productId,
                    outOfStock: !currentOutOfStock
                })
            });
            const data = await response.json();
            if (data.success) {
                setProducts(products.map(product =>
                    product.id === productId ? { ...product, outOfStock: !currentOutOfStock } : product
                ));
                alert(`Product stock status updated to: ${!currentOutOfStock ? 'Out of Stock' : 'In Stock'}`);
            } else {
                alert('Failed to update stock status.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update stock status.');
        }
    };

    return (
        <div className="product-list-container">
            <h2 className="product-list-title">Product List</h2>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className={`product-item ${product.outOfStock ? 'out-of-stock' : ''}`}>
                        <img src={product.image} alt={product.name} />
                        <div className="product-item-details">
                            <h3 className="product-item-name">
                                {product.name}
                                {product.outOfStock && <span className="out-of-stock-label">OUT OF STOCK</span>}
                            </h3>
                            <p className="product-item-category">Category: {product.category}</p>
                            <p className="product-item-price">Price: ${product.new_price}</p>
                            <div className="product-actions">
                                <button
                                    className={`stock-toggle-btn ${product.outOfStock ? 'in-stock' : 'out-of-stock'}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleToggleStock(product.id, product.outOfStock);
                                    }}
                                >
                                    {product.outOfStock ? 'Mark In Stock' : 'Mark Out of Stock'}
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDeleteProduct(product.id);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;