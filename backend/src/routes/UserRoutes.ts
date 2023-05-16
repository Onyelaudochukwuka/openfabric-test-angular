/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import UserService from '@src/services/UserService';
import { IUser } from '@src/models/User';
import { IReq, IRes } from './types/express/misc';

import PwdUtils from '@src/util/PwdUtil';
import SessionUtil from '@src/util/SessionUtil';

// **** Functions **** //
async function register(req: IReq<IUser & { password: string }>, res: IRes) {
  const { userName, email, password } = req.body;

  const user = {
    userName,
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
async function login(req: IReq<IUser & { password: string }>, res: IRes) {
  const { email, password } = req.body;
  const user = await UserService.login(email, password);
  if (user) {
    SessionUtil.addSessionData(res, user);
  }
}
const getUser = async (
  req: IReq<IUser>,
  res: IRes,
) => {
  const id = res.locals.sessionUser?.userId as string;
  const user = await UserService.getUserById(id);
  return res.status(HttpStatusCodes.OK).json({
    success: true,
    message: 'user fetched successfully',
    user,
  });
};
async function getHistory(req: IReq<IUser>, res: IRes) {
  const id = res.locals.sessionUser?.userId as string;
  const history = await UserService.getHistory(id);

  return res.status(HttpStatusCodes.OK).json({
    success: true,
    message: 'user history fetched successfully',
    history,
  });
}

async function addHistory(req: IReq<{ product: string }>, res: IRes) {
  const id = res.locals.sessionUser?.userId as string;
  const { product } = req.body;
  const history = await UserService.addHistory(id, product);

  return res.status(HttpStatusCodes.OK).json({
    success: true,
    message: 'user history updated successfully',
    history,
  });
}

function logOut(_: IReq<IUser>, res: IRes) {
  SessionUtil.clearCookie(res);
  return res.status(HttpStatusCodes.OK).json({
    success: true,
    message: 'user logged out successfully',
  });
}
// **** Export default **** //

export default {
  register,
  login,
  getHistory,
  addHistory,
  getUser,
  logOut,
} as const;
