const request = require('supertest');
const app = require('./index');

describe('Order Service API', () => {
  it('should return a list of orders', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should return a single order by id', async () => {
    const res = await request(app).get('/orders/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', 1);
  });
  
  it('should return 404 for non-existent order', async () => {
    const res = await request(app).get('/orders/999');
    expect(res.statusCode).toEqual(404);
  });
});
