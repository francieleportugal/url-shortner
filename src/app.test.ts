import req from "supertest";
import app from './App';

describe('app.js', () => {
  it("Register new url, ok", async () => {
    await req(app)
      .post("/")
      .send({ 
        url: 'https://www.educative.io/courses/grokking-the-system-design-interview/m2ygV4E81AR' ,
        name: 'educative',
      })
      .expect(200);
  });
  it.todo('Register url with existing key, erro');
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
  it.todo('Query missing URL, error');
});
