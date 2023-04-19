import './App.css';
import Navbar from './components/Navbar';
import Searchbox from './components/Searchbox';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Custom404 from './components/utils/Custom404';
import ProductList from './components/ProductList';
import Product from './components/Product';
import Cart from './components/Cart';
import { AuthProvider } from './components/context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Custom404 />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
