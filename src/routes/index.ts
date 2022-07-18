import express from 'express';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { authenticateRoutes } from './authenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';
import { carsRoutes } from './cars.routes';
import { rentalsRoutes } from './rentals.routes';

const app = express();

app.use('/auth', authenticateRoutes);
app.use('/users', usersRoutes);

app.use(ensureAuthenticated);

app.use('/categories', categoriesRoutes);
app.use('/specifications', specificationsRoutes);
app.use('/cars', carsRoutes);
app.use('/rentals', rentalsRoutes);

export default app;