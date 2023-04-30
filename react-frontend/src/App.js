import './App.css';
import Navbar from './components/Navbar';
import Searchbox from './components/search/Searchbox';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Custom404 from './components/utils/Custom404';
import ProductList from './components/ProductList';
import Product from './components/Product';
import Cart from './components/Cart';
import { AuthProvider } from './components/context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CartCheckout from './components/cartCheckout/CartCheckout';
import EditAccount from './components/edit/EditAccount';
import ProductCheckout from './components/productCheckout/ProductCheckout';
import ScrollUp from './components/utils/ScrollUp';
import AdminDashboard from './components/dashboard/AdminDashboard';
import ModeratorDashboard from './components/dashboard/ModeratorDashboard';
import SearchResults from './components/search/SearchResults';
import SavedProducts from './components/SavedProducts';
import OrderDetails from './components/dashboard/OrderDetails';

function App() {
  return (
    <div className="App">
      <AuthProvider >
        <Navbar />
        <Searchbox />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:category" element={<ProductList />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/checkout" element={<CartCheckout />} />
          <Route path="/account/edit" element={<EditAccount />} />
          <Route path="/checkout" element={<ProductCheckout />} />

          <Route path="/search" element={<SearchResults />}/>
          <Route path="/saved-products" element={<SavedProducts />} />

          {/* Dashboards */}
          <Route path="dashboard/admin" element={<AdminDashboard />} />
          <Route path="dashboard/moderator" element={<ModeratorDashboard />} />
          <Route path="order/:id" element={<OrderDetails />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Custom404 />} />
        </Routes>
        <ScrollUp />
      </AuthProvider>
    </div>
  );
}

export default App;
