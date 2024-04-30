import { fail, redirect, type Actions } from '@sveltejs/kit';
import { loginSchema } from './_loginSchema';
import { getUserData } from '$lib/db/user';
import { setSessionCookie } from '$lib/auth';

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const formDataEntries = Object.fromEntries(formData.entries());

		const { error, data } = loginSchema.safeParse(formDataEntries);

		if (error) {
			return fail(400, {
				...error.flatten(),
				fields: formDataEntries,
			});
		}

		const user = await getUserData(data.email, data.password);

		if (!user) {
			return fail(400, {
				formErrors: ['Invalid email or password'],
				fieldErrors: {},
				fields: formDataEntries,
			});
		}

		try {
			await setSessionCookie(user.id, cookies);
		} catch (error) {
			return fail(500, {
				formErrors: ['An error occurred while logging in'],
				fieldErrors: {},
				fields: formDataEntries,
			});
		}

		redirect(302, '/');
	},
} satisfies Actions;
