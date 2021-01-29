import { PrismaClient } from '@prisma/client';
import app from './App';

const prisma = new PrismaClient();

const port = process.env.PORT || 3000;

async function main() {
  await prisma.url.create({
    data: {
      name: 'educative',
      url: 'https://www.educative.io/courses/grokking-the-system-design-interview/m2ygV4E81AR',
    } })
  const all = await prisma.url.findMany()
  console.log(all)
}

//4
main()
  .catch(e => {
    throw e
  })
  // 5
  .finally(async () => {
    await prisma.$disconnect()
  })

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});