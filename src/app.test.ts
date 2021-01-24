import req from "supertest";
import app from './App';

describe('app.js', () => {
  it("Cadastrar url nova, ok", async () => {
    await req(app)
      .post("/")
      .send({ 
        url: 'https://www.educative.io/courses/grokking-the-system-design-interview/m2ygV4E81AR' ,
        name: 'educative',
      })
      .expect(200);
  });
  it.todo('Cadastrar url com chave existente, erro');
  it.todo('Enviar url inválida, erro');
  it.todo('Enviar chave inválida, erro');
  it('Consultar url existente, ok', async () => {
    await req(app)
      .get("/educative")
      .expect(302);
  });
  it.todo('Consultar url inexistente, erro');
});