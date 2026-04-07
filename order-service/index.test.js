const request = require('supertest');
const app = require('./index');

describe('Order Service API', () => {
  it('should create a new order', async () => {
    const res = await request(app)
      .post('/orders')
      .send({
        userId: 1,
        items: [{ productId: 1, quantity: 2, price: 100 }]
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('total', 200);
    expect(res.body.status).toEqual('Processing');
  });

  it('should return a user\'s orders', async () => {
    const res = await request(app).get('/orders/user/1');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
