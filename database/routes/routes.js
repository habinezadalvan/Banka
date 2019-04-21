import express from 'express';
import usersRoute from '../routes/users.routes';
import accountsRoutes from '../routes/accounts.routes';
import transactionRoutes from '../routes/transactions.routes';

const app = express();

app.use(usersRoute, accountsRoutes, transactionRoutes);

export default app;
