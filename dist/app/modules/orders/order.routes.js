"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const order_controller_1 = require("./order.controller");
const router = (0, express_1.Router)();
router.post('/create-order', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER, user_1.ENUM_USER_ROLE.ADMIN), order_controller_1.OrderController.insertIntoDb);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), order_controller_1.OrderController.getAllDb);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.OrderController.getAllDbCustomer);
router.get('/:orderId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.OrderController.singleGetDb);
exports.OrderRoutes = router;
