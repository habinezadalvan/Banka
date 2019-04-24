import express from 'express';
import transactionsRoutes from './transactionsRoutes';
import userRoutes from './userRoutes';
import accountsRoutes from './accountsRoutes';

const app = express();

app.use(userRoutes, accountsRoutes, transactionsRoutes);

export default app;
