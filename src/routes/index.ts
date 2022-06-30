import express from 'express';
import { authenticateRoutes } from './authenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const app = express();

app.use('/categories', categoriesRoutes);
app.use('/specifications', specificationsRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authenticateRoutes);

export default app;