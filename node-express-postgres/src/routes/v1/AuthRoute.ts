import AuthController from '@controllers/v1/AuthController';
import { validate } from '@middlewares/ValidationMiddleware';
import { Router } from 'express';
import { loginWithEmailPasswordSchema } from 'src/schemas/AuthSchemas';
const router = Router();

export default router;
const authController = new AuthController();

router
    .route('/login')
    .post(
        validate(loginWithEmailPasswordSchema),
        authController.loginWithEmailPassword
    );
