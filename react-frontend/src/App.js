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
import ProductCheckout from './components/productCheckout/ProductCheckout';
import ScrollUp from './components/utils/ScrollUp';
import AdminDashboard from './components/dashboard/AdminDashboard';
import ModeratorDashboard from './components/dashboard/ModeratorDashboard';
import SearchResults from './components/search/SearchResults';
import SavedProducts from './components/SavedProducts';
import OrderDetails from './components/dashboard/OrderDetails';
import UserOrderList from './components/trackOrder/UserOrderList';
import UserOrderDetail from './components/trackOrder/UserOrderDetail';
import Confirmation from './components/utils/Confirmation';
import EditAccount from './components/EditAccount';
import PaymentResult from './components/Payment/PaymentResult';
import Footer from './components/Footer';
import TOS from './components/legal/TOS';
import RefundPolicy from './components/legal/RefundPolicy';




function App() {
  return (
    <div className="App overflow-x-hidden min-h-screen">
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

          <Route path="/search" element={<SearchResults />} />
          <Route path="/saved-products" element={<SavedProducts />} />

          {/* Dashboards */}
          <Route path="dashboard/admin" element={<AdminDashboard />} />
          <Route path="dashboard/moderator" element={<ModeratorDashboard />} />
          <Route path="order/:id" element={<OrderDetails />} />

          <Route path="payment-result" element={<PaymentResult />} />

          {/* Legal */}
          <Route path="terms-of-service" element={<TOS />} />
          <Route path="refund-policy" element={<RefundPolicy />} />


          <Route path=":username/orders/" element={<UserOrderList />} />
          <Route path=":username/order/:id" element={<UserOrderDetail />} />
          <Route path="test" element={<Confirmation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Custom404 />} />

        </Routes>
        <Footer />
        <ScrollUp />
      </AuthProvider>
    </div>
  );
}

export default App;
