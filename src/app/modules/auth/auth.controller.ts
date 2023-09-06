import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const { ...authData } = req.body;
  const result = await AuthService.insertIntoDb(authData);
  const { refreshToken, ...others } = result;

  const options = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is successfully SingUp',
    data: others,
  });
});

export const AuthController = {
  insertIntoDb,
};
