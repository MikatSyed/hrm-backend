import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { DepartmentService } from './department.service';

const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {

    const result = await DepartmentService.insertIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Department Created Sucessfully',
      data: result,
    });
  });

const getAllDepartment: RequestHandler = catchAsync(async (req, res) => {
  const result = await DepartmentService.getAllFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Department retrieved successfully !',
    data: result,
  });
});

const getByIdFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DepartmentService.getByIdFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Department fetched successfully!',
    data: result,
  });
});

const updateOneInDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DepartmentService.updateOneInDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Department updated successfully!',
    data: result,
  });
});

const deleteByIdFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DepartmentService.deleteByIdFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Department deleted successfully!',
    data: result,
  });
});

export const DepartmentController = {
  insertIntoDB,
  getAllDepartment,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
