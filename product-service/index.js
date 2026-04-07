const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const products = [
  {
    id: 1,
    name: 'Wireless Noise-Cancelling Headphones',
    price: 299.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60',
    description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life.'
  },
  {
    id: 2,
    name: 'Minimalist Smartwatch',
    price: 199.50,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60',
    description: 'Track your fitness and notifications with this sleek, waterproof smartwatch.'
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    price: 129.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500&q=60',
    description: 'RGB mechanical keyboard with tactile switches for the ultimate typing experience.'
  },
  {
    id: 4,
    name: '4K Action Camera',
    price: 249.99,
    category: 'Cameras',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=60',
    description: 'Capture your adventures in stunning 4K resolution. Waterproof and durable.'
  }
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');
  res.json(product);
});

const PORT = process.env.PORT || 3002;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Product service running on port ${PORT}`);
  });
}

module.exports = app;
