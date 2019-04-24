import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/routes';

const app = express();
app.use(bodyParser.json());
app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to banka',
}));

app.use(router);

app.listen(process.env.PORT || 3000, () => {
  console.log('App listen on port 3000');
});

export default app;
