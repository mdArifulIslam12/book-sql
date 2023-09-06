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
exports.BooksService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const book_contanst_1 = require("./book.contanst");
const insertIntoDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({ data });
    return result;
});
const getAllDb = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm, minPrice, maxPrice, category } = filters, filter = __rest(filters, ["searchTerm", "minPrice", "maxPrice", "category"]);
    const andCondations = [];
    if (searchTerm) {
        andCondations.push({
            OR: book_contanst_1.BookSearchAbleFilters.map(field => ({
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
    }
    else if (minPrice !== undefined) {
        andCondations.push({
            price: {
                gte: Number(minPrice),
            },
        });
    }
    else if (maxPrice !== undefined) {
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
                    equals: filter[key],
                },
            })),
        });
    }
    const whereCondations = andCondations.length > 0 ? { AND: andCondations } : {};
    const result = yield prisma_1.default.book.findMany({
        where: whereCondations,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.limit,
            }
            : {
                price: 'desc',
            },
    });
    const total = yield prisma_1.default.book.count({ where: whereCondations });
    return {
        meta: {
            total,
            page: page,
            limit: limit,
        },
        data: result,
    };
});
const getCategoryDb = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findMany({
        where: {
            categoryId,
        },
        include: {
            category: true,
        },
    });
    return result;
});
const updateDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
        where: { id },
        data: payload,
    });
    return result;
});
const singleGetDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
        where: { id },
        include: {
            category: true,
        },
    });
    return result;
});
const deleteDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({ where: { id } });
    return result;
});
exports.BooksService = {
    insertIntoDb,
    getAllDb,
    singleGetDb,
    updateDb,
    deleteDb,
    getCategoryDb,
};
