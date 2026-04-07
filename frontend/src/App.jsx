import { Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, LogIn, LogOut, Package } from 'lucide-react';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
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
          <Link to="/" className="nav-link">Products</Link>
          <Link to="/cart" className="nav-link cart-link">
            <ShoppingCart size={20} />
            {cartSize > 0 && <span className="cart-badge">{cartSize}</span>}
          </Link>
          {user ? (
            <div className="user-menu">
               <span className="welcome">Hi, {user.name.split(' ')[0]}</span>
               <button onClick={() => setUser(null)} className="btn-icon"><LogOut size={20} /></button>
            </div>
          ) : (
            <Link to="/login" className="nav-link"><LogIn size={20} /> Login</Link>
          )}
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Nexora E-Commerce. Powered by Docker Microservices.</p>
      </footer>
    </div>
  );
}

export default App;
