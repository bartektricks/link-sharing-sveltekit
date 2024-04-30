import { lucia, setSessionCookie } from '$lib/auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const sessionHandle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);

	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;

		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);

	if (session?.fresh) {
		await setSessionCookie(event.cookies, session.id);
	}

	if (!session) {
		await setSessionCookie(event.cookies);
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};

const authorizationHandle: Handle = async ({ event, resolve }) => {
	const user = event.locals.user;
	const isAuthRoute = Boolean(event.route.id?.includes('(auth)'));

	if (user && isAuthRoute) {
		return redirect(302, '/');
	}

	if (!user && !isAuthRoute) {
		return redirect(302, '/login');
	}

	return resolve(event);
};

export const handle: Handle = sequence(sessionHandle, authorizationHandle);
