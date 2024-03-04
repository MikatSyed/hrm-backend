import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import fs from "fs/promises";
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { generateId } from '../../../helpers/IdGenerate';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { sendEMail } from '../../utils/sendMail';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const signup = async (data: User): Promise<Partial<User>> => {
  const { password, role, ...userData } = data; 
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt_rounds)
  );
  const userName = generateId(role); // Generate ID based on role
  const result = await prisma.user.create({
    data: {
      ...userData, 
      userName, 
      password: hashedPassword, 
      role 
    },

  });

  const subject = 'Welcome to HRM - Your Login Details';
  const from = process.env.Email;
  const htmlContent = await fs.readFile(__dirname + '/../../utils/welcome_email_template.html', 'utf8');

 
  const replacedHtmlContent = htmlContent
  .replace('{{ userName }}', userName)
  .replace('{{ password }}', password);

  if (result) {
    sendEMail(from, result.email, subject, replacedHtmlContent);
  }
  return result;
};



const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await bcrypt.compare(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token
  const { id: userId, role } = isUserExist;

  const token = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    token,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token

  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  // console.log(verifiedToken);
  const { userId } = verifiedToken;

  // checking deleted user's refresh token

  const isUserExist = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token
  const { id, role } = isUserExist;
  const newAccessToken = jwtHelpers.createToken(
    {
      id: id,
      role: role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    token: newAccessToken,
  };
};
export const AuthService = {
  signup,
  loginUser,
  refreshToken,
};
