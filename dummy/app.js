import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';

const app = express();
app.use(bodyParser.json());

app.use(router);

app.listen(process.env.PORT || 3000, () => {
  console.log('App listen on port 3000');
});

export default app;
