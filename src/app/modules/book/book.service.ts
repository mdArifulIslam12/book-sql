import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BookSearchAbleFilters } from './book.contanst';
import { IBookFilters } from './book.interface';

const insertIntoDb = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({ data });
  return result;
};

const getAllDb = async (
  filters: IBookFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, minPrice, maxPrice, category, ...filter } = filters;

  const andCondations = [];

  if (searchTerm) {
    andCondations.push({
      OR: BookSearchAbleFilters.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (minPrice !== undefined && maxPrice !== undefined) {
    andCondations.push({
      price: {
        gte: Number(minPrice),
        lte: Number(maxPrice),
      },
    });
  } else if (minPrice !== undefined) {
    andCondations.push({
      price: {
        gte: Number(minPrice),
      },
    });
  } else if (maxPrice !== undefined) {
    andCondations.push({
      price: {
        lte: Number(maxPrice),
      },
    });
  }
  if (category) {
    andCondations.push({
      categoryId: category,
    });
  }

  if (Object.keys(filters).length > 0) {
    andCondations.push({
      AND: Object.keys(filter).map(key => ({
        [key]: {
          equals: (filter as any)[key],
        },
      })),
    });
  }

  const whereCondations: Prisma.BookWhereInput =
    andCondations.length > 0 ? { AND: andCondations } : {};

  const result = await prisma.book.findMany({
    where: whereCondations,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.limit,
          }
        : {
            price: 'desc',
          },
  });

  const total = await prisma.book.count({ where: whereCondations });

  return {
    meta: {
      total,
      page: page,
      limit: limit,
    },
    data: result,
  };
};

const getCategoryDb = async (categoryId: string): Promise<Book[]> => {
  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
    include: {
      category: true,
    },
  });
  return result;
};

const updateDb = async (
  id: string,
  payload: Partial<Book>
): Promise<Book | null> => {
  const result = await prisma.book.update({
    where: { id },
    data: payload,
  });
  return result;
};
const singleGetDb = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
  return result;
};
const deleteDb = async (id: string) => {
  const result = await prisma.book.delete({ where: { id } });
  return result;
};

export const BooksService = {
  insertIntoDb,
  getAllDb,
  singleGetDb,
  updateDb,
  deleteDb,
  getCategoryDb,
};
