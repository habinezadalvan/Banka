import express from 'express';
import usersRoute from './users.routes';
import accountsRoutes from './accounts.routes';
import transactionRoutes from './transactions.routes';

const app = express();

app.use(usersRoute, accountsRoutes, transactionRoutes);

export default app;
