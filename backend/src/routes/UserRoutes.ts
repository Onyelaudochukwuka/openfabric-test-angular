import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import UserService from '@src/services/UserService';
import { IUser } from '@src/models/User';
import { IReq, IRes } from './types/express/misc';

import PwdUtils from '@src/util/PwdUtil';

// **** Functions **** //
async function register(req: IReq<IUser & { password: string }>, res: IRes) {
  const { name, email, password } = req.body;

  const user = {
    name,
    email,
    hashedPassword: await PwdUtils.getHash(password),
  };
  const newUser = await UserService.register(user);

  return res.status(HttpStatusCodes.OK).json({
    success: true,
    message: 'user created successfully',
    user: newUser,
  });
}

async function getHistory(req: IReq<IUser>, res: IRes) {

  const { id } = req.params;
  const history = await UserService.getHistory(id);

  return res.status(HttpStatusCodes.OK).json({
    success: true,
    message: 'user history fetched successfully',
    history,
  });
}

async function addHistory(req: IReq<{ product: string }>, res: IRes) {
  const { id } = req.params;
  const { product } = req.body;
  const history = await UserService.addHistory(id, product);

  return res.status(HttpStatusCodes.OK).json({
    success: true,
    message: 'user history updated successfully',
    history,
  });
}

// **** Export default **** //

export default {
  register,
  getHistory,
  addHistory,
} as const;
