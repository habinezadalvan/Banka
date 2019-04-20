import express from 'express';
import usersRoute from '../routes/users.routes';
import accountsRoutes from '../routes/accounts.routes';

const app = express();

app.use(usersRoute, accountsRoutes);

export default app;
