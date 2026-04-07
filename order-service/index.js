const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const orders = [
  { id: 1, userId: 1, productId: 1, quantity: 1, status: 'Shipped' },
  { id: 2, userId: 2, productId: 2, quantity: 2, status: 'Processing' }
];

app.get('/orders', (req, res) => {
  res.json(orders);
});

app.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).send('Order not found');
  res.json(order);
});

const PORT = process.env.PORT || 3003;
// Export app for testing
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Order service running on port ${PORT}`);
  });
}

module.exports = app;
