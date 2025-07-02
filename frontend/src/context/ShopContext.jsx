import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const ShopContext = createContext(null);

const getDefaultCart = () => {
    return {};
};

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [addToCartMessage, setAddToCartMessage] = useState(null);
    const navigate = useNavigate();
  useEffect(() => {
       axios.get('https://bbuyorcry3.onrender.com/allproducts')
           .then((response) => {
               setAll_Product(response.data);
           })
           .catch((error) => {
               console.error("Error fetching products:", error);
           });
   }, []);

   useEffect(() => {
       if (localStorage.getItem('auth-token')) {
           axios.post('https://bbuyorcry3.onrender.com/getcart', {}, {
               headers: {
                   'auth-token': `${localStorage.getItem('auth-token')}`,
                   'Content-Type': 'application/json',
               }
           })
           .then((response) => {
               setCartItems(response.data);
           })
           .catch((error) => {
               console.error("Error fetching cart:", error);
           });
       }
   }, [localStorage.getItem('auth-token')]);


   const addToCart = (itemId, size) => {
       if (localStorage.getItem('auth-token')) {
           setCartItems((prev) => ({ ...prev, [itemId]: { quantity: (prev[itemId]?.quantity || 0) + 1, size: size } }));
           setAddToCartMessage("Item added to cart!");
           setTimeout(() => {
               setAddToCartMessage(null);
           }, 2000);
           axios.post('https://bbuyorcry3.onrender.com/addtocart', { itemId, size }, {
               headers: {
                   'auth-token': `${localStorage.getItem('auth-token')}`,
                   'Content-Type': 'application/json',
               }
           })
           .then((response) => console.log(response.data))
           .catch((error) => console.error("Error adding to cart:", error));
       } else {
           navigate('/login');
       }
   };

   const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCartItems = { ...prev };
            delete newCartItems[itemId];
            return newCartItems;
        });
        if (localStorage.getItem('auth-token')) {
            axios.post('https://bbuyorcry3.onrender.com/removefromcart', { itemId }, {
                headers: {
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => console.log(response.data))
            .catch((error) => console.error("Error removing from cart:", error));
        }
    };

   const updateCartItemCount = (itemId, count) => {
        setCartItems((prev) => ({ ...prev, [itemId]: { ...prev[itemId], quantity: count } }));
        if (localStorage.getItem('auth-token')) {
            axios.post('https://bbuyorcry3.onrender.com/updatecart', { itemId, count, size: cartItems[itemId].size }, {
                headers: {
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                }
            })
            .then((response) => console.log(response.data))
            .catch((error) => console.error("Error updating cart:", error));
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item]?.quantity > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                   totalAmount += itemInfo.new_price * cartItems[item].quantity;
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
       let totalItem = 0;
       for (const item in cartItems) {
           if (cartItems[item]?.quantity > 0) {
               totalItem += cartItems[item].quantity;
           }
       }
       return totalItem;
   }

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart, updateCartItemCount, addToCartMessage };
    return (
        <ShopContext.Provider value={contextValue}>
            {addToCartMessage && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'green',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    zIndex: 1000,
                    fontSize: '24px',
                }}>
                    {addToCartMessage}
                </div>
            )}
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
