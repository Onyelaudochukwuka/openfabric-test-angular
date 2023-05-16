/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Router } from 'express';
import fileUpload, { UploadedFile } from 'express-fileupload';
import { body } from 'express-validator';

import Paths from './constants/Paths';
import ProductRoute from './ProductRoute';
import UserRoutes from './UserRoutes';
import Validate from './middleware/validate';
import User from '@src/models/User';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import signdedInMw from "./middleware/signdedInMw";

// **** Variables **** //
const apiRouter = Router();
const EMAIL_ALREADY_EXISTS_ERR = 'Email already exists';

// ** Add UserRouter ** //

const productRouter = Router();
const userRouter = Router();

productRouter.post(
  Paths.Product.Add,
  // body('name').isString().withMessage('product name is required'),
  // body('price').isNumeric().withMessage('price is required'),
  // body('description').isString().withMessage('description is required'),
  // Validate,
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    createParentPath: true,
  }),
  ProductRoute.create,
);
productRouter.get(Paths.Product.Get, ProductRoute.getAll);
productRouter.get(Paths.Product.Search, ProductRoute.search);
productRouter.put(Paths.Product.Update, ProductRoute.update);
productRouter.delete(Paths.Product.Delete, ProductRoute.deleteProduct);
productRouter.get(Paths.Product.GetById, ProductRoute.getOne);
productRouter.get(
  Paths.Product.Rate,
  body('rating').isNumeric().withMessage('rating is required'),
  Validate,
  ProductRoute.rateProduct,
);
userRouter.post(
  Paths.Users.Register,
  body('userName').isString().withMessage('name is required'),
  body('email').custom((value) => {
    return User.findOne({ email: value }).then((user) => {
      if (user) {
        throw new RouteError(
          HttpStatusCodes.NOT_FOUND,
          EMAIL_ALREADY_EXISTS_ERR,
        );
      }
    });
  }),
  body('password').isLength({ min: 6}).withMessage('password is required'),
  Validate,
  UserRoutes.register,
);
userRouter.post(
  Paths.Users.Login,
  body('email').isEmail().withMessage('email is required'),
  body('password').isString().withMessage('password is required'),
  Validate,
  UserRoutes.login,
);
userRouter.get(
  Paths.Users.GetUser,
  signdedInMw,
  UserRoutes.getUser,
);
userRouter.get(
  Paths.Users.History,
  signdedInMw,
  UserRoutes.getHistory,
);
userRouter.post(
  Paths.Users.AddHistory,
  signdedInMw,
  body('product').isString().withMessage('product is required'),
  Validate,
  UserRoutes.addHistory,
);
userRouter.get(
  Paths.Users.LogOut,
  signdedInMw,
  UserRoutes.logOut,
);
// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Product.Base, productRouter);

// **** Export default **** //

export default apiRouter;
