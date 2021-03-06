import req from "supertest";
import app from './App';
import moment from 'moment';

describe('app.js', () => {
  jest.setTimeout(10000);
  it("Register new url without expiration date, ok", async () => {
    await req(app)
      .post("/")
      .send({ 
        url: 'https://www.educative.io/courses/grokking-the-system-design-interview/m2ygV4E81AR' ,
        name: 'educative',      
      })
      .expect(200);
  });
  it("Register new url with expiration date, ok", async () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    await req(app)
      .post("/")
      .send({ 
        url: 'https://github.com/francieleportugal/url-shortner' ,
        name: 'urlShortner',
        expiration_date: date,   
      })
      .expect(200);
  });
  it("Register new url with invalid expiration date, ok", async () => {
    await req(app)
      .post("/")
      .send({ 
        url: 'https://github.com/francieleportugal/url-shortner' ,
        name: 'urlShortner',
        expiration_date: '2021-26T02:55:10.875Z',   
      })
      .expect(400);
  });
  it("Register new url with invalid expiration date, ok", async () => {
    await req(app)
      .post("/")
      .send({ 
        url: 'https://github.com/francieleportugal/url-shortner' ,
        name: 'urlShortner',
        expiration_date: null,   
      })
      .expect(400);
  });
  it('Register url with existing key, error', async () => {
    await req(app)
      .post("/")
      .send({ 
        url: 'https://www.educative.io/courses/grokking-the-system-design-interview/m2ygV4E81AR' ,
        name: 'educative',
      })
      .expect(422)
      .then(res => {
        expect(res.body.message).toBe("Name to abbreviate url already exists");
      });
  });
  it('Send invalid url, error in data validation', async () => {
    await req(app)
      .post("/")
      .send({ 
        url: 'www.fran.com' ,
        name: 'educative97',
      })
      .expect(400)
      .then(res => {
        expect(res.body.message).toBe("Error in data validation");
        expect(res.body.errors[0].validation).toBe('url');
      });
  });
  it('Send name like number, error in data validation ', async () => {
    await req(app)
      .post("/")
      .send({ 
        url: 'https://www.educative.io/courses/grokking-the-system-design-interview/m2ygV4E81AR' ,
        name: 1,
      })
      .expect(400)
      .then(res => {
        expect(res.body.message).toBe("Error in data validation");
        expect(res.body.errors[0].expected).toBe("string");
        expect(res.body.errors[0].path[0]).toBe("name");
      });
  });
  it('Send name with especial caracteres, error in data validation ', async () => {
    await req(app)
      .post("/")
      .send({ 
        url: 'https://www.educative.io/courses/grokking-the-system-design-interview/m2ygV4E81AR' ,
        name: 'a1-+/*',
      })
      .expect(400)
      .then(res => {
        expect(res.body.message).toBe("Error in data validation");
        expect(res.body.errors[0].validation).toBe("regex");
      });
  });
  it('Query existing URL, ok', async () => {
    await req(app)
      .get("/educative")
      .expect(302);
  });
  it('Query missing URL, error', async () => {
    await req(app)
      .get("/invalidName")
      .expect(404)
      .then(res => {
        expect(res.body.message).toBe("The short name of the url does not exist");
      });
  });
  it('Query expired URL, error', async () => {
    await req(app)
      .get("/urlShortner")
      .expect(422)
      .then(res => {
        expect(res.body.message).toBe("URL expired");
      });
  });
  it('Check metrics, ok', async () => {
    await req(app)
      .get("/educative/metrics")
      .expect(200)
      .then(res => {
        const date = moment(new Date()).format("DD/MM/YYYY").toString();

        expect(res.body.metrics.length).toBe(1);
        expect(res.body.metrics[0].date).toBe(date);
        expect(res.body.metrics[0].total).toBeGreaterThan(1);
      });
  });
});
