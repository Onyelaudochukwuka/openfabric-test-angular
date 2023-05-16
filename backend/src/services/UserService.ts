/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import User, { IUser } from '@src/models/User';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import PwdUtil from "@src/util/PwdUtil";

// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';
export const INCORECT_PASSWORD = 'Incorrect password';
// **** Functions **** //

async function register(user: IUser) {
  const userObj = new User<IUser>(user) as IUser & { save: any };
  await userObj.save();
  return userObj;
}
async function login(email: string, password: string) {
  const user: IUser | null = await User.findOne({ email });
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }
  const isPasswordCorrect = await PwdUtil.compare(password, user.hashedPassword as string);
  if (!isPasswordCorrect) {
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, INCORECT_PASSWORD);
  }
  return user;
}
async function getUserById(id: IUser['_id']) {
  const user: IUser[] = await User.findById(id).populate("history");
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }
  return user;
}
async function getHistory(id: IUser['_id']) {
  const user: IUser[] = await User.findById(id).populate("history");
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }
  return user;
}
async function addHistory(id: IUser['_id'], product: string) {
  const check = await User.findById(id);
  if (check.history.includes(product)) {
    return check.history
  } else {
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
}
export default {
  register,
  login,
  getHistory,
  addHistory,
  getUserById,
} as const;
