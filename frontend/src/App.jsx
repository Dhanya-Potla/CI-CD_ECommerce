import { Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, LogIn, LogOut, Package, User } from 'lucide-react';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useCart } from './CartContext';
import './App.css';

function App() {
  const { cart, user, setUser } = useCart();
  const cartSize = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/">
            <Package className="brand-icon" />
            <span className="brand-name">NexoraShop</span>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Catalog</Link>
          <Link to="/cart" className="nav-link cart-link">
            <ShoppingCart size={20} />
            {cartSize > 0 && <span className="cart-badge">{cartSize}</span>}
          </Link>
          {user ? (
            <div className="user-menu">
               <Link to="/profile" className="nav-link"><User size={20} /> {user.name.split(' ')[0]}</Link>
               <button onClick={() => setUser(null)} className="btn-icon"><LogOut size={20} /></button>
            </div>
          ) : (
            <Link to="/login" className="nav-link login-btn"><LogIn size={20} /> Sign In</Link>
          )}
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
             <Package size={24} className="brand-icon"/>
             <span className="brand-name">NexoraShop</span>
          </div>
          <p>Next-generation microservice architecture. Powered by React & Docker.</p>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Nexora E-Commerce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
