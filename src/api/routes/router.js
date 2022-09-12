import express from 'express';
import { userRouter } from './user/user.routes.js';

const router = express.Router();

// routes
router.get('/', (_, res) => {
  res.send('Hello World');
});

router.use('/user', userRouter);

export { router };
