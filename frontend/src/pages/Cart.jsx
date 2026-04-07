import { useState } from 'react';
import { useCart } from '../CartContext';
import { Trash2, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Cart() {
  const { cart, removeFromCart, clearCart, user } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3003/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          items: cart.map(i => ({ productId: i.id, quantity: i.quantity, price: i.price }))
        })
      });
      
      if (response.ok) {
        setOrderStatus('success');
        clearCart();
      } else {
        setOrderStatus('error');
      }
    } catch (error) {
      console.error(error);
      setOrderStatus('error');
    }
    setLoading(false);
  };

  if (orderStatus === 'success') {
    return (
      <div className="checkout-success">
        <h2>🎉 Order Placed Successfully!</h2>
        <p>Thank you for shopping at NexoraShop.</p>
        <button className="btn-primary" onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <button className="btn-primary" onClick={() => navigate('/')}>Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      <div className="cart-layout">
        <ul className="cart-list">
          {cart.map(item => (
            <li key={item.id} className="cart-item">
              <div className="cart-img" style={{ backgroundImage: `url(${item.image})` }} />
              <div className="cart-details">
                <h4>{item.name}</h4>
                <p className="item-price">${item.price.toFixed(2)}</p>
                <div className="cart-actions">
                  <span className="qty">Qty: {item.quantity}</span>
                  <button className="btn-icon danger" onClick={() => removeFromCart(item.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button 
            className="btn-primary checkout-btn" 
            onClick={handleCheckout} 
            disabled={loading}
          >
            <CreditCard size={20} /> {loading ? 'Processing...' : 'Secure Checkout'}
          </button>
          {!user && <p className="auth-notice">You will be asked to login.</p>}
        </div>
      </div>
    </div>
  );
}
