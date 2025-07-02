import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import logo from '../../assets/logo.png';
import cart_icon from '../../assets/cart_icon.png';
import './Navbar.css';

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

    return (
        <div className="navbar">
            <div className="navbar__logo">
                <img src={logo} alt="BuyOrCry Logo" />
                <p>BuyOrCry</p>
            </div>
            <ul className="navbar__menu">
                <li onClick={() => setMenu("shop")}>
                    <Link to='/'>Shop</Link> {menu === "shop" ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu("mens")}>
                    <Link to='/mens'>Men</Link> {menu === "mens" ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu("womens")}>
                    <Link to='/womens'>Women</Link> {menu === "womens" ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu("kids")}>
                    <Link to='/kids'>Kids</Link> {menu === "kids" ? <hr /> : <></>}
                </li>
            </ul>
            <div className="navbar__buttons">
                {localStorage.getItem('auth-token')
                ? <button onClick={() => {localStorage.removeItem('auth-token'); localStorage.removeItem('isAdmin'); window.location.replace('/')}}>Logout</button>
                : <Link to='/login'><button>Login</button></Link>}
                {localStorage.getItem('auth-token') && <Link to='/myorders'><button>My Orders</button></Link>}
                {isAdmin && (
                    <div className="admin-buttons">
                        <Link to="/addproduct">
                            <button>Add Product</button>
                        </Link>
                        <Link to="/admin/products">
                            <button>View Products</button>
                        </Link>
                        <Link to="/admin/orders">
                            <button>Manage Orders</button>
                        </Link>
                    </div>
                )}

                <Link className="navbar__cart" to='/cart'><img src={cart_icon} alt="Cart" /></Link>
                <div className="navbar__cart-count">
                    {getTotalCartItems()}
                </div>
            </div>
        </div>
    );
}

export default Navbar;