import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';

const router = Router();

router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),
  OrderController.insertIntoDb
);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), OrderController.getAllDb);
router.get(
  '/',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.getAllDbCustomer
);
router.get(
  '/:orderId',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.singleGetDb
);

export const OrderRoutes = router;
