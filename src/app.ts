import 'reflect-metadata';
import express from 'express';
import router from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';


import './database';

import './shared/container';

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3333);

app.use(router);

export default app;