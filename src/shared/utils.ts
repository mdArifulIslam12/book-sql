/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';

export const asyncforEach = async (array: any[], callback: any) => {
  if (!Array.isArray(array)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Unable is array');
  }
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
