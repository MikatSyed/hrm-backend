import { Attendance } from '@prisma/client';
import { format } from 'date-fns';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Attendance,userId:string): Promise<Attendance> => {
  data.userId= userId;
  console.log({userId});
  console.log(data);
  const result = await prisma.attendance.create({ data });
  return result;
};

const getAllFromDB = async (): Promise<Attendance[]> => {
    const result = await prisma.attendance.findMany({
      include: {
        Users: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return result;
  };
  
const getByIdFromDB = async (id: string): Promise<Attendance | null> => {
  const isattendanceExist = await prisma.attendance.findFirst({
    where: {
      id,
    },
  });

  if (!isattendanceExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'attendance does not exist');
  }

  const result = await prisma.attendance.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOneInDB = async (
    id: string,
   
  ): Promise<Attendance> => {
    const isAttendanceExist = await prisma.attendance.findFirst({
      where: {
        id,
      },
    });
  
    if (!isAttendanceExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Attendance does not exist');
    }
  
    const getCurrentTimeFormatted = () => {
        const currentTime = new Date();
        const formattedTime = format(currentTime, "hh:mm a");
        return formattedTime;
      };

    // Parse the provided departure string to ensure it's a valid time
    const departure = getCurrentTimeFormatted()
    console.log(departure);
  
    const result = await prisma.attendance.update({
      where: {
        id,
      },
      data: {
        departure: departure,
      },
    });
  
    return result;
  };
const deleteByIdFromDB = async (id: string): Promise<Attendance> => {
  const isattendanceExist = await prisma.attendance.findFirst({
    where: {
      id,
    },
  });

  if (!isattendanceExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'attendance does not exist');
  }

  const data = await prisma.attendance.delete({
    where: {
      id,
    },
  });
  return data;
};

export const AttendanceService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
