"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const book_controller_1 = require("./book.controller");
const router = (0, express_1.Router)();
router.post('/create-book', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.insertIntoDb);
router.get('/', book_controller_1.BookController.getAllDb);
router.get('/:categoryId', book_controller_1.BookController.getCategoryDb);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.updateIntoDb);
router.get('/:id', book_controller_1.BookController.singleGetDb);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.deleteIntoDb);
exports.BookRoutes = router;
