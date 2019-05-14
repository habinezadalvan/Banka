import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import router from './routes/routes';
import swaggerDoc from './swagger.json';

const app = express();
app.use('/swaggerapi', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to banka',
}));

app.use(router);

app.listen(process.env.PORT || 3000, () => {
  console.log('App listen on port 3000');
});

export default app;
