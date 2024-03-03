import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AttendanceService } from './attendance.service';

const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
 
  const userId = req?.user?.userId;
  console.log({userId});
  const result = await AttendanceService.insertIntoDB(req.body,userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Checked In Sucessfully',
    data: result,
  });
});

const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await AttendanceService.getAllFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'attendance fetched successfully',
    data: result,
  });
});

const getByIdFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AttendanceService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'attendance fetched successfully',
    data: result,
  });
});

const updateOneInDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AttendanceService.updateOneInDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'attendance updated successfully',
    data: result,
  });
});

const deleteByIdFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AttendanceService.deleteByIdFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'attendance deleted successfully',
    data: result,
  });
});

export const AttendanceController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
