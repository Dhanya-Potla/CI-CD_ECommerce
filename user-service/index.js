const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', password: 'password123' },
  { id: 2, name: 'Bob Jones', email: 'bob@example.com', password: 'password123' }
];

app.get('/users', (req, res) => {
  const safeUsers = users.map(({ password, ...rest }) => rest);
  res.json(safeUsers);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  const { password, ...safeUser } = user;
  res.json(safeUser);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const { password: _, ...safeUser } = user;
  res.json({ message: 'Login successful', user: safeUser });
});

const PORT = process.env.PORT || 3001;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`User service running on port ${PORT}`);
  });
}

module.exports = app;
