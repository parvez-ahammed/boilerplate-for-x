import { IZodValidationSchema } from '@interfaces/IZodValidationSchema.';
import { z } from 'zod';

const loginWithEmailPasswordBody = z.object({
    email: z
        .string()
        .email('Invalid email format')
        .trim()
        .min(5, 'Email must be at least 5 characters long'),
    password: z
        .string()
        .trim()
        .min(1, 'Password must be at least 1 character long'),
});

const loginWithEmailPasswordSchema: IZodValidationSchema = {
    body: loginWithEmailPasswordBody,
};

export { loginWithEmailPasswordSchema };
