import app from './App';
import removeExpiredUrls from './jobs/removeExpiredUrls';

const port = process.env.PORT || 3000;

removeExpiredUrls.start();

app.listen(port, () => {
  // eslint-disable-next-line
  return console.log(`server is listening on ${port}`); // no-console
});

