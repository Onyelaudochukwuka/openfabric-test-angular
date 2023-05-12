/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import Product, { IProducts } from '@src/models/Product';

// **** Variables **** //
/**
 * export variables for easy testing.
 */
export const PRODUCT_NOT_FOUND = 'Product not found';
export const RATING_MORE_THAN_5 = 'Rating must be less than 5';
// **** Functions **** //

/**
 * create new products.
 */
async function create(product: IProducts): Promise<IProducts> {
  const productObj = new Product<IProducts>(product) as IProducts & {
    save: any;
  };
  await productObj.save();
  return productObj;
}

/**
 * Get all products.
 */
async function getAll(): Promise<IProducts[]> {
  const product: IProducts[] = await Product.find({});
  if (product.length < 1) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, PRODUCT_NOT_FOUND);
  }
  return product;
}

/**
 * Get get one product
 */
async function getOne(id: IProducts['_id']): Promise<IProducts> {
  const product: IProducts | null = await Product.findById(id);
  if (!product) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, PRODUCT_NOT_FOUND);
  }
  return product;
}

/**
 * update one product
 */
async function update(
  id: IProducts['_id'],
  product: Partial<IProducts>,
): Promise<IProducts> {
  const productObj: IProducts | null = await Product.findByIdAndUpdate(
    id,
    product,
    { new: true },
  );
  if (!productObj) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, PRODUCT_NOT_FOUND);
  }
  return productObj;
}

/**
 * search for a products.
 */
async function search(name: IProducts['name']): Promise<IProducts[]> {
  const product: IProducts[] = await Product.find({
    name: {
      $regex: name,
      $options: 'i',
    },
  });
  if (product.length < 1) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, PRODUCT_NOT_FOUND);
  }
  return product;
}

/**
 * delete a product.
 */
async function deleteProduct(id: IProducts['_id']) {
  const product: IProducts | null = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, PRODUCT_NOT_FOUND);
  }
  return product;
}

/**
 * rate a product.
 */
async function rateProduct(id: IProducts['_id'], rating: number): Promise<IProducts> {
  if (rating > 5) throw new RouteError(HttpStatusCodes.BAD_REQUEST, RATING_MORE_THAN_5);
  const product: IProducts | null = await Product.findByIdAndUpdate(id, {
    $push: {
      rating,
    },
  }, { new: true });
  if (!product) throw new RouteError(HttpStatusCodes.NOT_FOUND, RATING_MORE_THAN_5);
  return product;
}

// **** Export default **** //

export default {
  create,
  getAll,
  getOne,
  deleteProduct,
  update,
  search,
  rateProduct,
} as const;
