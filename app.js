import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { logger } from './logger/logger.js'
const app = express();

dotenv.config({ path: './.env' });

import('./config/config.database.js')

app.use(express.json());
app.use(cors())

import routes from './app/routes/routes.js'

app.use("/app/", routes())

app.listen(process.env.PORT, () => {
    logger.info(`Server is listening to the port`);
})

export default app;