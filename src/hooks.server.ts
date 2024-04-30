import { getSessionCookie } from '$lib/auth/session';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const user = getSessionCookie(event.cookies);

	if (!user) {
		return redirect(302, '/login');
	}

	if (event.route.id?.includes('(auth)')) {
		return redirect(302, '/');
	}

	return await resolve(event);
};
