import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(console.error);

    fetch('http://localhost:3002/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);

    fetch('http://localhost:3003/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Microservices Dashboard</h1>
      </header>
      <main className="dashboard">
        <section className="card">
          <h2>Users Service</h2>
          <ul>
            {users.map(u => (
              <li key={u.id}>{u.name} ({u.email})</li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2>Products Service</h2>
          <ul>
            {products.map(p => (
              <li key={p.id}>{p.name} - ${p.price}</li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2>Orders Service</h2>
          <ul>
            {orders.map(o => (
              <li key={o.id}>
                Order #{o.id} - User {o.userId} bought Product {o.productId} [{o.status}]
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
