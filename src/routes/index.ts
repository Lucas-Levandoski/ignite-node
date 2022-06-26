import express from 'express';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';

const app = express();

app.use('/categories', categoriesRoutes);
app.use('/specifications', specificationsRoutes);

export default app;