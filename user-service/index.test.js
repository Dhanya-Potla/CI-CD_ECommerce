const request = require('supertest');
const app = require('./index');

describe('User Service API', () => {
  it('should return a list of users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should return a single user by id', async () => {
    const res = await request(app).get('/users/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', 1);
  });
  
  it('should return 404 for non-existent user', async () => {
    const res = await request(app).get('/users/999');
    expect(res.statusCode).toEqual(404);
  });
});
