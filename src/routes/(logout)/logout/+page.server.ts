import { lucia } from '$lib/auth';
import { redirect, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ cookies, locals }) => {
	if (!locals.session) {
		return redirect(301, '/login');
	}

	await lucia.invalidateUserSessions(locals.session.id);

	// This should be set in a cron job.
	await lucia.deleteExpiredSessions();

	const sessionCookie = lucia.createBlankSessionCookie();

	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes,
	});

	return redirect(301, '/login');
};
