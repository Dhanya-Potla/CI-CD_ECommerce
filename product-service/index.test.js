const request = require('supertest');
const app = require('./index');

describe('Product Service API', () => {
  it('should return a list of products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should return a single product by id', async () => {
    const res = await request(app).get('/products/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', 1);
  });
  
  it('should return 404 for non-existent product', async () => {
    const res = await request(app).get('/products/999');
    expect(res.statusCode).toEqual(404);
  });
});
