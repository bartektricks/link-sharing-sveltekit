import { fail, redirect, type Actions } from '@sveltejs/kit';
import { loginSchema } from './_loginSchema';
import db from '$lib/db';
import { verifyPassword } from '$lib/auth/password';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const formDataEntries = Object.fromEntries(formData.entries());

		const { error, data } = loginSchema.safeParse(formDataEntries);

		if (error) {
			return fail(400, {
				...error.flatten(),
				fields: formDataEntries,
			});
		}

		const user = await db.query.users.findFirst({
			where: (user, { eq }) => eq(user.email, data.email),
		});

		const passwordMatch = user && (await verifyPassword(data.password, user.password));

		if (!passwordMatch) {
			return fail(400, {
				formErrors: ['Invalid email or password'],
				fieldErrors: {},
				fields: formDataEntries,
			});
		}

		redirect(302, '/');
	},
} satisfies Actions;
