import app from './App';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  // eslint-disable-next-line
  return console.log(`server is listening on ${port}`); // no-console
});