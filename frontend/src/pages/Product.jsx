import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/Breadcrums/Breadcrum';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import './Product.css'; 

const Product = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams();
    const product = all_product.find((e) => e._id === productId);

    if (!product) {
        return <div>Product not found!</div>;
    }

    return (
        <div className="product-page">
            <Breadcrum product={product} />
            <ProductDisplay product={product} />
        </div>
    );
};

export default Product;
