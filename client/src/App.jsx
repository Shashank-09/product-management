import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProductDetails from './components/ProductDetails';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const App = () => (
  <Router>
    <Routes>
      <Route path='/'  element={<Navigate to='/signin'/>} />
      <Route path='/signin' element={<SignIn   />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products/:id" element={<ProductDetails />} />
    </Routes>
  </Router>
);

export default App;
