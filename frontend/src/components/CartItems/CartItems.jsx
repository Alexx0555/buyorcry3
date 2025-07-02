import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import remove_icon from '../../assets/cart_cross_icon.png';
import './CartItems.css';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
    const { all_product, cartItems, removeFromCart, getTotalCartAmount, updateCartItemCount } = useContext(ShopContext);
    const navigate = useNavigate();
    
    const handleIncrement = (itemId) => {
        updateCartItemCount(itemId, cartItems[itemId].quantity + 1);
    };

    const handleDecrement = (itemId) => {
        if (cartItems[itemId].quantity > 1) {
            updateCartItemCount(itemId, cartItems[itemId].quantity - 1);
        } else {
            removeFromCart(itemId);
        }
    };

    return (
        <div className="cartitems">
            <div className="cartitems__header">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] && cartItems[e.id]?.quantity > 0) {
                    return <div key={e.id}>
                        <div className="cartitems__item">
                            <img src={e.image} alt="" />
                            <p>{e.name}</p>
                            <p>${e.new_price}</p>
                            <div className="quantity-controls">
                                <button onClick={() => handleDecrement(e.id)}>-</button>
                                <button>{cartItems[e.id]?.quantity}</button>
                                <button onClick={() => handleIncrement(e.id)}>+</button>
                            </div>
                            <p>${e.new_price * cartItems[e.id]?.quantity}</p>
                            <img className='remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                        </div>
                        <hr />
                    </div>
                }
                return null;
            })}
            <div className="cartitems__total">
                <div className="cartitems__total-summary">
                    <h1>Cart Totals</h1>
                    <div className="cartitems__total-summary-details">
                        <div>
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div>
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems__total-summary-details">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button onClick={() => {
                        navigate('/checkout');
                    }}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems__promo">
                    <p>If you have a promo code, enter it here</p>
                    <div className="cartitems__promo-input">
                        <input type="text" placeholder='promo code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems;