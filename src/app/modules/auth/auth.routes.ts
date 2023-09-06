import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();

router.post('/singup', AuthController.insertIntoDb);

export const AuthRoutes = router;
