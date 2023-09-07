import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.insertIntoDb
);
router.get('/', CategoryController.getAllDb);
router.get('/:id', CategoryController.singleGetDb);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.updateIntoDb
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteIntoDb
);

export const CategoryRoutes = router;
