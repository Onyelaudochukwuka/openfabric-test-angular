import { Router } from 'express';
import { body } from 'express-validator';

import Paths from './constants/Paths';


// **** Variables **** //

const apiRouter = Router();


// ** Add UserRouter ** //

const productRouter = Router();
const userRouter = Router();

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Product.Base, productRouter);


// **** Export default **** //

export default apiRouter;
