import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Item from '../components/Item/Item';

import './ShopCategory.css';

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        const filteredProducts = all_product.filter(item => props.category === item.category);
        setProducts(filteredProducts);
    }, [all_product, props.category]);

    const sortProducts = (order) => {
        setSortOrder(order);
        let sortedProducts = [...products];

        if (order === 'lowToHigh') {
            sortedProducts.sort((a, b) => a.new_price - b.new_price);
        } else if (order === 'highToLow') {
            sortedProducts.sort((a, b) => b.new_price - a.new_price);
        }

        setProducts(sortedProducts);
    };

    return (
        <div className='shop-category'>
            <img src={props.banner} alt="" />
            <div className="shop-category-indexSort">
                <div className="shop-category-sort">
                    Sort by
                    <select value={sortOrder} onChange={(e) => sortProducts(e.target.value)}>
                        <option value="">Select</option>
                        <option value="lowToHigh">Price Low to High</option>
                        <option value="highToLow">Price High to Low</option>
                    </select>
                </div>
            </div>
            <div className="shop-category-products">
                {products.map((item, i) => (
                    <Item key={i} _id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} outOfStock={item.outOfStock} />
                ))}
            </div>
        </div>
    );
};

export default ShopCategory;