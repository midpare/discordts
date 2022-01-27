import express from 'express';


export = async function () {
  const app = express();

  const port = 3000 || 3001;
  app.get('/', (req, res) => {
    res.send('test message');
  });

  app.listen(port)
}