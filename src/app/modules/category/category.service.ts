import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({ data });
  return result;
};

const getAllDb = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany();
  return result;
};

const updateDb = async (
  id: string,
  payload: Partial<Category>
): Promise<Category | null> => {
  const result = await prisma.category.update({
    where: { id },
    data: payload,
  });
  return result;
};
const singleGetDb = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: { id },
    include: {
      books: true,
    },
  });
  return result;
};
const deleteDb = async (id: string) => {
  const result = await prisma.category.delete({ where: { id } });
  return result;
};

export const CategoryService = {
  insertIntoDb,
  getAllDb,
  singleGetDb,
  updateDb,
  deleteDb,
};
