import { validationResult } from 'express-validator';
import { IReq, IRes } from '../types/express/misc';
import { NextFunction } from 'express';
// **** Functions **** //
function Validate(req: IReq<unknown>, res: IRes, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: true,
      message: 'invalid request',
      data: errors.array(),
    });
  } else {
    next();
  }
}
export default Validate;