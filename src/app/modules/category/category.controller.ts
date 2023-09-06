import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const getAllDb = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories is get successfully',
    data: result,
  });
});
const singleGetDb = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.singleGetDb(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories is get single successfully',
    data: result,
  });
});
const updateIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.updateDb(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories is update single successfully',
    data: result,
  });
});
const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories is create successfully',
    data: result,
  });
});
const deleteIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.deleteDb(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories is delete single successfully',
    data: result,
  });
});

export const CategoryController = {
  insertIntoDb,
  updateIntoDb,
  getAllDb,
  singleGetDb,
  deleteIntoDb,
};
