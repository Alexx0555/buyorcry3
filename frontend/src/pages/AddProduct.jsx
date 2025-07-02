import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [new_price, setNewPrice] = useState('');
    const [old_price, setOldPrice] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);  
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddProduct = async () => {
        const token = localStorage.getItem('auth-token');
        try {
            const response = await fetch('https://bbuyorcry3.onrender.com/admin/addproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({
                    name: name,
                    image: image, 
                    category: category,
                    new_price: new_price,
                    old_price: old_price
                })
            });
            const data = await response.json();
            alert('Product added successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add product.');
        }
    };

    return (
        <div className="add-product-container">
            <div className="add-product-form">
                <h2 >Add Product</h2>
                <div className="mb-4">
                    <label htmlFor="name">Name:</label>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="image">Image:</label>
                    <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="category">Category:</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="new_price">New Price:</label>
                    <input type="number" placeholder="New Price" value={new_price} onChange={(e) => setNewPrice(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label htmlFor="old_price">Old Price:</label>
                    <input type="number" placeholder="Old Price" value={old_price} onChange={(e) => setOldPrice(e.target.value)} />
                </div>
                <button onClick={handleAddProduct}>Add Product</button>
            </div>
        </div>
    );
};

export default AddProduct;