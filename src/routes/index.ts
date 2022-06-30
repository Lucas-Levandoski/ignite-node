import express from 'express';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const app = express();

app.use('/categories', categoriesRoutes);
app.use('/specifications', specificationsRoutes);
app.use('/users', usersRoutes);

export default app;