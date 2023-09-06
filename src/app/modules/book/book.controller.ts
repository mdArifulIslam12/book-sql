import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BooksService } from './book.service';

const getAllDb = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, [
    'searchTerm',
    'minPrice',
    'maxPrice',
    'category',
  ]);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await BooksService.getAllDb(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book is get successfully',
    data: result,
  });
});
const singleGetDb = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksService.singleGetDb(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book is get single successfully',
    data: result,
  });
});
const getCategoryDb = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksService.getCategoryDb(req.params.categoryId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books with associated category data fetched successfully',
    data: result,
  });
});
const updateIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksService.updateDb(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book is update single successfully',
    data: result,
  });
});
const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book is create successfully',
    data: result,
  });
});
const deleteIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksService.deleteDb(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book is delete single successfully',
    data: result,
  });
});

export const BookController = {
  insertIntoDb,
  updateIntoDb,
  getAllDb,
  singleGetDb,
  deleteIntoDb,
  getCategoryDb,
};
