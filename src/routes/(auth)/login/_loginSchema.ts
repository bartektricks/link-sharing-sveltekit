import { z } from 'zod';

export const loginSchema = z.object({
	email: z
		.string({
			message: "Can't be empty",
		})
		.email({
			message: 'Invalid email',
		}),
	password: z.string({ message: 'Invalid value' }),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type LoginFormFlattenedError = z.inferFlattenedErrors<typeof loginSchema>;
