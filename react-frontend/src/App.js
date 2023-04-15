import './App.css';
import Navbar from './components/Navbar';
import NewArrivals from './components/NewArrivals';
import ProductCategories from './components/ProductCategories';
import Searchbox from './components/Searchbox';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Test from './components/Test';
import ProductList from './components/ProductList';
import Product from './components/Product';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Searchbox />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:category" element={<ProductList />} />
        <Route path="/product/:slug" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
