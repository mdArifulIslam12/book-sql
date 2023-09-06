"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
/* eslint-disable no-unused-vars */
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const utils_1 = require("../../../shared/utils");
const insertIntoDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderedBooks } = data, books = __rest(data, ["orderedBooks"]);
    const newOrder = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield transactionClient.order.create({ data: books });
        if (orderedBooks && orderedBooks.length > 0) {
            yield (0, utils_1.asyncforEach)(orderedBooks, (preOrderBook) => __awaiter(void 0, void 0, void 0, function* () {
                const orderedBooksResult = yield transactionClient.orderBook.create({
                    data: {
                        orderId: result.id,
                        bookId: preOrderBook.bookId,
                        quantity: Number(preOrderBook.quantity),
                    },
                });
            }));
        }
        return result;
    }));
    const result = yield prisma_1.default.order.findUnique({
        where: {
            id: newOrder.id,
        },
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
const getAllDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findMany({
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
const getAllDbCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findMany({
        where: {
            userId: id,
        },
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
const singleGetDb = (userId, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findUnique({
        where: {
            id,
            userId: userId,
        },
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
exports.OrderService = {
    insertIntoDb,
    getAllDb,
    getAllDbCustomer,
    singleGetDb,
};
