import { lucia, setSessionCookie } from '$lib/auth';
import { redirect, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ cookies, locals }) => {
	if (!locals.session || !locals.user) {
		return redirect(301, '/login');
	}

	await lucia.invalidateUserSessions(locals.session.id);

	// This should be set in a cron job.
	await lucia.deleteExpiredSessions();

	setSessionCookie(cookies);

	return redirect(301, '/login');
};
