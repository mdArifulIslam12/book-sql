import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProfileService } from "./profile.service";

const singleGetDb = catchAsync(async (req: Request, res: Response) => {
    const user = req.user
    const result = await ProfileService.singleGetDb(user?.id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get specifer user successfully',
      data: result,
    });
  });
export const ProfileController = {
    singleGetDb
}