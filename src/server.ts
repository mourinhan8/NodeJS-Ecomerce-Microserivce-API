import { createServer } from 'http';
import app from './app';

const server = createServer(app);

server.listen(process.env.APP_PORT, () => {
  console.log(`Streaming app listening on port ${process.env.APP_PORT}`);
});
