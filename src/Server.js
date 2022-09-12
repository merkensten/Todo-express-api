// imports
import express from 'express';
import helmet from 'helmet';

// Config
import Config from './config/Config.js';

// Middlewares
import middlewares from './api/middlewares/Middlewares.js';

// router
import { router } from './api/routes/router.js';

const app = express();

app.use(express.json());
app.use(helmet());

// router
app.use('/', router);

// middlewares
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const startApp = async () => {
  try {
    await Config.connectToDB();
    Config.connectToPort(app);
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

startApp();

export default app;
