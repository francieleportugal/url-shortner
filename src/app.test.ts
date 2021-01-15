import req from "supertest";
import app from './App';

describe('app.js', () => {
  it("[GET] /", async () => {
    const res = await req(app).get("/");
    expect(res.body.message).toBe('Hello World!');
  });
});