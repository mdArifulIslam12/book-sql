import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllDb = async (): Promise<User[]> => {
  const result = await prisma.user.findMany();
  return result;
};

const updateDb = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const result = await prisma.user.update({
    where: { id },
    data: payload,
  });
  return result;
};
const singleGetDb = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: { id },
  });
  return result;
};
const deleteDb = async (id: string) => {
  const result = await prisma.user.delete({ where: { id } });
  return result;
};

export const UserService = {
  getAllDb,
  updateDb,
  deleteDb,
  singleGetDb,
};
