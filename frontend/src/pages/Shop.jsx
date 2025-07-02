import React, { useEffect, useState } from 'react';
import Item from '../components/Item/Item';
import hero_image from '../assets/hero_image.png';
import axios from 'axios';

import './Shop.css';
const Shop = () => {
    const [popular, setPopular] = useState([]);
    const [newCollection, setNewCollection] = useState([]);

    useEffect(() => {
        console.log("Shop.jsx: popular, newCollection", popular, newCollection); // Added log
        axios.get('http://localhost:4000/allproducts')
            .then(response => {
                setPopular(response.data.slice(0, 4));
                setNewCollection(response.data.slice(4, 12));
                console.log("Shop.jsx: Products fetched successfully", response.data);
            })
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    return (
        <div className='shop'>
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-left">
                    <h2>NEW ARRIVALS ONLY</h2>
                    <div>
                        <div className="hero-new-collection">
                            <p>new</p>
                        </div>
                        <p>collections</p>
                        <p>for everyone</p>
                    </div>
                    <div onClick={() => {
                        const element = document.getElementById('new-collections');
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }} className="hero-latest-collection">
                        <div>Latest Collection</div>
                    </div>
                </div>
                <div className="hero-right">
                    <img src={hero_image} alt="Hero" />
                </div>
            </div>

            {/* Popular Section */}
            <div className='popular-section'>
                <h1>POPULAR IN MEN</h1>
                <hr />
                <div className="popular-item">
                    {popular.map((item, i) => (
                        <Item key={i} _id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} outOfStock={item.outOfStock} />
                    ))}
                </div>
            </div>

            {/* New Collections Section */}
            <div id="new-collections" className='popular-section'>
                <h1>NEW COLLECTIONS</h1>
                <hr />
                <div className="popular-item">
                    {newCollection.map((item, i) => (
                        <Item key={i} _id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} outOfStock={item.outOfStock} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Shop;
