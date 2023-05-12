import { Router } from 'express';
import { body } from 'express-validator';

import Paths from './constants/Paths';
import ProductRoute from './ProductRoute';
import Validate from './middleware/validate';

// **** Variables **** //

const apiRouter = Router();

// ** Add UserRouter ** //

const productRouter = Router();
const userRouter = Router();

productRouter.post(
  Paths.Product.Add,
  body('name').isString().withMessage('product name is required'),
  body('imageUrl').isString().withMessage('imageUrl is required'),
  body('price').isNumeric().withMessage('price is required'),
  body('description').isString().withMessage('description is required'),
  Validate,
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
// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Product.Base, productRouter);

// **** Export default **** //

export default apiRouter;
