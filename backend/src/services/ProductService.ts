/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import Product, { IProducts } from '@src/models/Product';

// **** Variables **** //

export const PRODUCT_NOT_FOUND = 'Product not found';

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
  const product: IProducts[] = await Product.find({ name: name });
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
async function rate(id: IProducts['_id'], rating: number): Promise<IProducts> {
  const product: IProducts | null = await Product.findByIdAndUpdate(id, {
    $push: {
      rating,
    },
  });
  if (!product) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, PRODUCT_NOT_FOUND);
  }
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
  rate,
} as const;
