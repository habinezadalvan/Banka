import express from 'express';
import usersRoute from '../routes/users.routes';

const app = express();

app.use(usersRoute);

export default app;
