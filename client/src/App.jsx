import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProductDetails from './components/ProductDetails';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/products/:id" element={<ProductDetails />} />
    </Routes>
  </Router>
);

export default App;
