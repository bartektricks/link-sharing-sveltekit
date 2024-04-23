import { z } from 'zod';

export const MIN_PASS_LENGTH = 8;

export const registerSchema = z
	.object({
		email: z
			.string({
				message: "Can't be empty",
			})
			.email({
				message: 'Invalid email',
			}),
		password: z.string({ message: 'Invalid value' }).min(MIN_PASS_LENGTH, {
			message: 'Please check again',
		}),
		confirmPassword: z.string({ message: 'Invalid value' }),
	})
	.refine((check) => check.password === check.confirmPassword, {
		message: 'No match',
		path: ['confirmPassword'],
	});

export type RegisterForm = z.infer<typeof registerSchema>;
export type RegisterFormFlattenedError = z.inferFlattenedErrors<typeof registerSchema>;
