import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const getAllDb = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is get successfully',
    data: result,
  });
});
const singleGetDb = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.singleGetDb(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is get single successfully',
    data: result,
  });
});
const updateIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateDb(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is update single successfully',
    data: result,
  });
});
const deleteIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteDb(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is delete single successfully',
    data: result,
  });
});

export const UserController = {
  getAllDb,
  updateIntoDb,
  singleGetDb,
  deleteIntoDb,
};
