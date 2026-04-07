import { useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import { ShoppingBag } from 'lucide-react';
import '../App.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('http://localhost:3002/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loader">Loading amazing products...</div>;

  return (
    <div className="products-page">
      <div className="hero">
        <h1>Discover the Extraordinary</h1>
        <p>Premium tech curated just for you.</p>
      </div>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image" style={{ backgroundImage: `url(${product.image})` }} />
            <div className="product-info">
              <span className="product-cat">{product.category}</span>
              <h3>{product.name}</h3>
              <p className="product-desc">{product.description}</p>
              <div className="product-bottom">
                <span className="price">${product.price.toFixed(2)}</span>
                <button className="btn-primary" onClick={() => addToCart(product)}>
                  <ShoppingBag size={18} /> Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
