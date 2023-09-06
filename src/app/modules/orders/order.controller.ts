import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is create successfully',
    data: result,
  });
});

const getAllDb = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is get successfully',
    data: result,
  });
});
const getAllDbCustomer = catchAsync(async (req: Request, res: Response) => {
  const data = req.user;
  if (data) {
    const result = await OrderService.getAllDbCustomer(data?.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order is get customer successfully',
      data: result,
    });
  }
});
const singleGetDb = catchAsync(async (req: Request, res: Response) => {
  const data = req.user;

  const result = await OrderService.singleGetDb(data?.id, req.params.orderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is get single successfully',
    data: result,
  });
});

export const OrderController = {
  insertIntoDb,
  getAllDb,
  getAllDbCustomer,
  singleGetDb,
};
