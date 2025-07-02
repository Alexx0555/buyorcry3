import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import ProductList from './components/ProductList/ProductList';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import Footer from './components/Footer/Footer';
import AddProduct from './pages/AddProduct';
import men_banner from './assets/banner_mens.png';
import women_banner from './assets/banner_women.png';
import kid_banner from './assets/banner_kids.png';
import CheckoutDetails from './pages/CheckoutDetails';
import MyOrders from './pages/MyOrders';
import AdminOrders from './components/AdminOrders/AdminOrders';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/admin/products' element={<ProductList />} />
          <Route path='/admin/orders' element={<AdminOrders />} />
          <Route path="/checkout" element={<CheckoutDetails />} />
          <Route path="/success" element={() => <div>Payment Successful!</div>} />
          <Route path="/cancel" element={() => <div>Payment Cancelled!</div>} />
          <Route path="/myorders" element={<MyOrders />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
