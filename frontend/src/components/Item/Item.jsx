import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';

const Item = (props) => {
    const handleClick = (e) => {
        if (props.outOfStock) {
            e.preventDefault();
            return false;
        }
        window.scrollTo(0, 0);
    };

    return (
        <div className={`item ${props.outOfStock ? 'out-of-stock' : ''}`}>
            <Link
                to={props.outOfStock ? '#' : `/product/${props._id}`}
                onClick={handleClick}
                className={props.outOfStock ? 'disabled-link' : ''}
            >
                <img src={props.image} alt={props.name} />
                {props.outOfStock && <div className="out-of-stock-overlay">OUT OF STOCK</div>}
            </Link>
            <div className="item-details">
                <p className={`item-name ${props.outOfStock ? 'out-of-stock-text' : ''}`}>
                    {props.name}
                </p>
                <div className="item-prices">
                    <div className={`item-new-price ${props.outOfStock ? 'out-of-stock-text' : ''}`}>
                        ${props.new_price}
                    </div>
                    <div className={`item-old-price ${props.outOfStock ? 'out-of-stock-text' : ''}`}>
                        ${props.old_price}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;
