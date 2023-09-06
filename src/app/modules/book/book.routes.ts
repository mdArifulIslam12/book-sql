import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookController } from './book.controller';

const router = Router();

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.insertIntoDb
);
router.get('/', BookController.getAllDb);
router.get('/:categoryId', BookController.getCategoryDb);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.updateIntoDb);
router.get('/:id', BookController.singleGetDb);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteIntoDb);

export const BookRoutes = router;
