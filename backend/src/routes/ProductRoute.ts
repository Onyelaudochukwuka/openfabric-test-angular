/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { IReq, IRes } from './types/express/misc';
import { IProducts } from '@src/models/Product';
import cloudinaryUtils from '@src/util/cloudinaryUtils';
import ProductService from '@src/services/ProductService';
// **** Functions **** //
async function create(req: IReq<IProducts>, res: IRes) {
  const { name, price, description } = req.body;
  const filepath = path.join(
    __dirname,
    '..', 
    '..',
    'upload',
    `${Date.now()}-${(req.files?.product_image as UploadedFile).name}`,
  );
  (req.files?.product_image as UploadedFile)?.mv(filepath,
    (err: unknown) => {
      if (err) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Error uploading file',
          error: err,
        });
      }
    },
  );
  const imageUrl = await cloudinaryUtils.uploadImage(filepath);
  const product = { name, imageUrl, price, description };
  const newProduct = await ProductService.create(product);
  return res
    .status(HttpStatusCodes.OK)
    .json({
      success: true,
      message: 'product created successfully',
      product: newProduct,
    });
}

async function getAll(_: IReq<IProducts>, res: IRes) {
  const products = await ProductService.getAll();
  return res
    .status(HttpStatusCodes.OK)
    .json({
      success: true,
      message: 'products fetched successfully',
      products,
    });
}
async function getOne(req: IReq<IProducts>, res: IRes) {
  const { id } = req.params;
  const product = await ProductService.getOne(id);
  return res
    .status(HttpStatusCodes.OK)
    .json({
      success: true,
      message: 'product fetched successfully',
      product,
    });
}
async function update(req: IReq<IProducts>, res: IRes) {
  const { id } = req.params;
  const { name, imageUrl, price, description } = req.body;
  const product = { name, imageUrl, price, description };
  const updatedProduct = await ProductService.update(id, product);
  return res
    .status(HttpStatusCodes.OK)
    .json({
      success: true,
      message: 'product updated successfully',
      product: updatedProduct,
    });
}

async function deleteProduct(req: IReq<IProducts>, res: IRes) {
  const { id } = req.params;
  const product = await ProductService.deleteProduct(id); 
  return res
    .status(HttpStatusCodes.OK)
    .json({
      success: true,
      message: 'product deleted successfully',
      product,
    });
}

async function search(req: IReq<{ query: {name: string}}>, res: IRes) {
  const { name } = req.query;
  const products = await ProductService.search((name as string));
  return res
    .status(HttpStatusCodes.OK)
    .json({
      success: true,
      message: 'products fetched successfully',
      products,
    });
}

async function rateProduct(req: IReq<{ rating: number}>, res: IRes) {
  const { id } = req.params;
  const { rating } = req.body;
  const product = await ProductService.rateProduct(id,rating);
  return res
    .status(HttpStatusCodes.OK)
    .json({
      success: true,
      message: 'product rated successfully',
      product,
    });
}
// **** Export Default **** //

export default {
  create,
  getAll,
  getOne,
  update,
  deleteProduct,
  search,
  rateProduct,
} as const;