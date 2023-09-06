import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllDb);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.singleGetDb);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.updateIntoDb);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteIntoDb);

export const UserRoutes = router;
