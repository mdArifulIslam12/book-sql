import { User } from '@prisma/client';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (data: User) => {
  const user = await prisma.user.create({ data });

  // access token
  const { id: userId, role } = user;
  const accessToken = jwtHelpers.createToken(
    {
      id: userId,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    {
      id: userId,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
    data,
  };
};

export const AuthService = {
  insertIntoDb,
};
