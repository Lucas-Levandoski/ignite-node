import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import router from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import { errorHandler } from './middlewares/errorHandler';


import './database';

import './shared/container';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);

app.use(errorHandler);

app.listen(3333);

export default app;