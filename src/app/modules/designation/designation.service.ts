import { Designation } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Designation): Promise<Designation> => {

  const result = await prisma.designation.create({ data });
  return result;
};

const getAllFromDB = async (): Promise<Designation[]> => {
    const result = await prisma.designation.findMany({
     
      orderBy: {
        createdAt: 'desc',
      },
    });
    return result;
  };
  
const getByIdFromDB = async (id: string): Promise<Designation | null> => {
  const isDesignationExist = await prisma.designation.findFirst({
    where: {
      id,
    },
  });

  if (!isDesignationExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Designation does not exist');
  }

  const result = await prisma.designation.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOneInDB = async (
    id: string,
    payload: Partial<Designation>
  ): Promise<Designation> => {
    const isDesignationExist = await prisma.designation.findFirst({
      where: {
        id,
      },
    });
  
    if (!isDesignationExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Designation does not exist');
    }
  
 
  
    const result = await prisma.designation.update({
      where: {
        id,
      },
      data:payload
    });
  
    return result;
  };
const deleteByIdFromDB = async (id: string): Promise<Designation> => {
  const isDesignationExist = await prisma.designation.findFirst({
    where: {
      id,
    },
  });

  if (!isDesignationExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Designation does not exist');
  }

  const data = await prisma.designation.delete({
    where: {
      id,
    },
  });
  return data;
};

export const DesignationService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
