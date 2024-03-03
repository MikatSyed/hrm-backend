import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { DesignationService } from './designation.service';

const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {

    const result = await DesignationService.insertIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Designation Created Sucessfully',
      data: result,
    });
  });

const getAllDesignation: RequestHandler = catchAsync(async (req, res) => {
  const result = await DesignationService.getAllFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Designation retrieved successfully !',
    data: result,
  });
});

const getByIdFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DesignationService.getByIdFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Designation fetched successfully!',
    data: result,
  });
});

const updateOneInDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DesignationService.updateOneInDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Designation updated successfully!',
    data: result,
  });
});

const deleteByIdFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DesignationService.deleteByIdFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Designation deleted successfully!',
    data: result,
  });
});

export const DesignationController = {
  insertIntoDB,
  getAllDesignation,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
