import req from "supertest";
import app from './App';

describe('app.js', () => {
  it.only("Cadastrar url nova, ok", async () => {
    const res = await req(app)
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
  it.todo('Consultar url existente, ok');
  it.todo('Consultar url inexistente, erro');
});