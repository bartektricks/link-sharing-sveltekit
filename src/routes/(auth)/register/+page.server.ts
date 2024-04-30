import { fail, redirect, type Actions } from '@sveltejs/kit';
import { registerSchema } from './_registerSchema';
import { setUserData } from '$lib/db/user';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const formDataEntries = Object.fromEntries(formData.entries());

		const { error, data } = registerSchema.safeParse(formDataEntries);

		if (error) {
			return fail(400, {
				...error.flatten(),
				fields: formDataEntries,
			});
		}

		// This should be better but it's just an MVP.
		try {
			await setUserData(data);
		} catch (error) {
			if (error instanceof Error && error.message.includes('email')) {
				return fail(400, {
					formErrors: ['Email already exists'],
					fieldErrors: {},
					fields: formDataEntries,
				});
			}

			return fail(500, {
				formErrors: ['Something went wrong'],
				fieldErrors: {},
				fields: formDataEntries,
			});
		}

		redirect(302, '/');
	},
} satisfies Actions;
