const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let orders = [
  { id: 1, userId: 1, items: [{ productId: 1, quantity: 1, price: 299.99 }], total: 299.99, status: 'Shipped' }
];
let nextId = 2;

app.get('/orders', (req, res) => {
  res.json(orders);
});

app.get('/orders/user/:userId', (req, res) => {
  const userOrders = orders.filter(o => o.userId === parseInt(req.params.userId));
  res.json(userOrders);
});

app.post('/orders', (req, res) => {
  const { userId, items } = req.body;
  if (!userId || !items || !items.length) {
    return res.status(400).json({ error: 'Invalid order data' });
  }

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const newOrder = {
    id: nextId++,
    userId: parseInt(userId),
    items,
    total,
    status: 'Processing',
    date: new Date().toISOString()
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

const PORT = process.env.PORT || 3003;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Order service running on port ${PORT}`);
  });
}

module.exports = app;
