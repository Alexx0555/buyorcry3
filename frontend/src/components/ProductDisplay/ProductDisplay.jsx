import React, { useContext, useState, useEffect } from 'react';
import star_icon from "../../assets/star_icon.png";
import star_dull_icon from "../../assets/star_dull_icon.png";
import { ShopContext } from '../../context/ShopContext';
import './ProductDisplay.css';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState(null);

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    const handleAddToCart = () => {
        if (product.outOfStock) {
            alert('This product is currently out of stock.');
            return;
        }
        if (selectedSize) {
            addToCart(product.id, selectedSize);
        } else {
            alert('Please select a size.');
        }
    };

    return (
        <div className="productdisplay">
            <div className="productdisplay__images">
                <div className="productdisplay__images-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className={`productdisplay__image ${product.outOfStock ? 'out-of-stock-image' : ''}`}>
                    <img src={product.image} alt="" />
                    {product.outOfStock && <div className="product-out-of-stock-overlay">OUT OF STOCK</div>}
                </div>
            </div>
            <div className="productdisplay__right">
                <h1 className={product.outOfStock ? 'out-of-stock-text' : ''}>
                    {product.name}
                    {product.outOfStock && <span className="out-of-stock-badge">OUT OF STOCK</span>}
                </h1>
                <div className="productdisplay__right-stars">
                    <img src={star_icon} alt="" /><img src={star_icon} alt="" /><img src={star_icon} alt="" /><img src={star_icon} alt="" /><img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay__right-prices">
                    <div className={product.outOfStock ? 'out-of-stock-text' : ''}>${product.old_price}</div>
                    <div className={product.outOfStock ? 'out-of-stock-text' : ''}>${product.new_price}</div>
                </div>
                <div className={`productdisplay__right-sizes ${product.outOfStock ? 'disabled' : ''}`}>
                    <h1>Select Size</h1>
                    <div className="productdisplay__right-sizes-options">
                        <div className={selectedSize === 'S' ? 'selected-size' : ''} onClick={product.outOfStock ? null : () => handleSizeClick('S')}>S</div>
                        <div onClick={product.outOfStock ? null : () => handleSizeClick('M')} className={selectedSize === 'M' ? 'selected-size' : ''}>M</div>
                        <div onClick={product.outOfStock ? null : () => handleSizeClick('L')} className={selectedSize === 'L' ? 'selected-size' : ''}>L</div>
                        <div onClick={product.outOfStock ? null : () => handleSizeClick('XL')} className={selectedSize === 'XL' ? 'selected-size' : ''}>XL</div>
                        <div onClick={product.outOfStock ? null : () => handleSizeClick('XXL')} className={selectedSize === 'XXL' ? 'selected-size' : ''}>XXL</div>
                    </div>
                </div>
                <button
                    onClick={handleAddToCart}
                    className={product.outOfStock ? 'productdisplay__right-addtocart-outofstock' : (selectedSize ? 'productdisplay__right-addtocart-enabled' : 'productdisplay__right-addtocart-disabled')}
                    disabled={product.outOfStock || !selectedSize}
                >
                    {product.outOfStock ? 'OUT OF STOCK' : 'ADD TO CART'}
                </button>
            </div>
        </div>
    )
}

export default ProductDisplay;