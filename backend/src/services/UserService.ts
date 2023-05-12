/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import User, { IUser } from '@src/models/User';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';

// **** Functions **** //

async function register(user: IUser) {
  const userObj = new User<IUser>(user) as IUser & { save: any };
  await userObj.save();
  return userObj;
}

async function getHistory(id: IUser['_id']) {
  const user: IUser[] | null = await User.findById(id).populate(
    'history.product',
  );
  if (!user || user.length < 1) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }
  return user;
}
async function addHistory(id: IUser['_id'], product: string) {
  const user: IUser | null = await User.findByIdAndUpdate(
    id,
    {
      $push: { history: product },
    },
    { new: true },
  );
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }
  return user.history;
}
export default {
  register,
  getHistory,
  addHistory,
} as const;
