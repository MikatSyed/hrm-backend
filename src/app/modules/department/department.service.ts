import { Department } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Department): Promise<Department> => {

  const result = await prisma.department.create({ data });
  return result;
};

const getAllFromDB = async (): Promise<Department[]> => {
    const result = await prisma.department.findMany({
     
      orderBy: {
        createdAt: 'desc',
      },
    });
    return result;
  };
  
const getByIdFromDB = async (id: string): Promise<Department | null> => {
  const isdepartmentExist = await prisma.department.findFirst({
    where: {
      id,
    },
  });

  if (!isdepartmentExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'department does not exist');
  }

  const result = await prisma.department.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOneInDB = async (
    id: string,
    payload: Partial<Department>
  ): Promise<Department> => {
    const isdepartmentExist = await prisma.department.findFirst({
      where: {
        id,
      },
    });
  
    if (!isdepartmentExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'department does not exist');
    }
  
 
  
    const result = await prisma.department.update({
      where: {
        id,
      },
      data:payload
    });
  
    return result;
  };
const deleteByIdFromDB = async (id: string): Promise<Department> => {
  const isdepartmentExist = await prisma.department.findFirst({
    where: {
      id,
    },
  });

  if (!isdepartmentExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'department does not exist');
  }

  const data = await prisma.department.delete({
    where: {
      id,
    },
  });
  return data;
};

export const DepartmentService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
