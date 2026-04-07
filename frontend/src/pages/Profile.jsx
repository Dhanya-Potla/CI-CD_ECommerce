import { useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Package, Clock } from 'lucide-react';
import '../App.css';

export default function Profile() {
  const { user } = useCart();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetch(`http://localhost:3003/orders/user/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <UserCircle size={80} className="profile-icon" />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <span className="badge">Verified Customer</span>
        </div>
      </div>

      <div className="orders-section">
        <h3><Package size={24} /> Order History</h3>
        {loading ? (
          <p className="loading-text">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <div className="no-orders">
            <p>You haven't placed any orders yet.</p>
            <button className="btn-primary" onClick={() => navigate('/products')}>Start Shopping</button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <span className="order-id">Order #{order.id}</span>
                  <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                </div>
                <div className="order-meta">
                  <span><Clock size={16} /> {new Date(order.date).toLocaleDateString()}</span>
                  <span className="order-total">${order.total.toFixed(2)}</span>
                </div>
                <div className="order-items-summary">
                  {order.items.length} item(s) purchased
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
