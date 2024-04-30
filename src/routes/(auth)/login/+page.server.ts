import { fail, redirect, type Actions } from '@sveltejs/kit';
import { loginSchema } from './_loginSchema';
import { setSessionCookie } from '$lib/auth/session';
import { getUserData } from '$lib/db/user';

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

		setSessionCookie(cookies, user);

		redirect(302, '/');
	},
} satisfies Actions;
