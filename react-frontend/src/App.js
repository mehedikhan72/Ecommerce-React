import './App.css';
import Navbar from './components/Navbar';
import NewArrivals from './components/NewArrivals';
import ProductCategories from './components/ProductCategories';
import Searchbox from './components/Searchbox';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Test from './components/Test';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Searchbox />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
