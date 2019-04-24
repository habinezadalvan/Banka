import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import router from './routes/routes';
import swaggerDoc from './swagger.json';

const app = express();
app.use(bodyParser.json());
app.use('/swaggerapi', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to banka',
}));

app.use(router);

app.listen(process.env.PORT || 3000, () => {
  console.log('App listen on port 3000');
});

export default app;
