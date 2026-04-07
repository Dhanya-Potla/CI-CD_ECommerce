const request = require('supertest');
const app = require('./index');

describe('User Service API', () => {
  it('should return a list of users without passwords', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body[0]).not.toHaveProperty('password');
  });

  it('should allow valid login', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'alice@example.com', password: 'password123' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Login successful');
    expect(res.body.user).toHaveProperty('name', 'Alice Smith');
  });
  
  it('should reject invalid login', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'alice@example.com', password: 'wrong' });
    expect(res.statusCode).toEqual(401);
  });
});
