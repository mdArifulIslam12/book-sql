/* eslint-disable no-unused-vars */
import prisma from '../../../shared/prisma';
import { asyncforEach } from '../../../shared/utils';
import { IOrderBooks } from './order.interface';

const insertIntoDb = async (data: any) => {
  const { orderedBooks, ...books } = data;
  const newOrder = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.order.create({ data: books });

    if (orderedBooks && orderedBooks.length > 0) {
      await asyncforEach(orderedBooks, async (preOrderBook: IOrderBooks) => {
        const orderedBooksResult = await transactionClient.orderBook.create({
          data: {
            orderId: result.id,
            bookId: preOrderBook.bookId,
            quantity: Number(preOrderBook.quantity),
          },
        });
      });
    }
    return result;
  });
  const result = await prisma.order.findUnique({
    where: {
      id: newOrder.id,
    },
    include: {
      orderedBooks: true,
    },
  });
  return result;
};

const getAllDb = async () => {
  const result = await prisma.order.findMany({
    include: {
      orderedBooks: true,
    },
  });
  return result;
};
const getAllDbCustomer = async (id: string) => {
  const result = await prisma.order.findMany({
    where: {
      userId: id,
    },
    include: {
      orderedBooks: true,
    },
  });
  return result;
};
const singleGetDb = async (userId: string, id: string) => {
  const result = await prisma.order.findUnique({
    where: {
      id,
      userId: userId,
    },
    include: {
      orderedBooks: true,
    },
  });
  return result;
};

export const OrderService = {
  insertIntoDb,
  getAllDb,
  getAllDbCustomer,
  singleGetDb,
};
