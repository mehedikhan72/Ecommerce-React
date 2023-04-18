import './App.css';
import Navbar from './components/Navbar';
import Searchbox from './components/Searchbox';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Custom404 from './components/utils/Custom404';
import ProductList from './components/ProductList';
import Product from './components/Product';
import Cart from './components/Cart';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Searchbox />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:category" element={<ProductList />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Custom404 />}/>
      </Routes>
    </div>
  );
}

export default App;
