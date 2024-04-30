import { dev } from '$app/environment';
import { adapter } from '$lib/db';
import type { Cookies } from '@sveltejs/kit';
import { Cookie, Lucia } from 'lucia';

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev,
		},
	},
});

export const setSessionCookie = async (cookies: Cookies, id?: string) => {
	let sessionCookie: Cookie | undefined;

	if (id) {
		const session = await lucia.createSession(id, {});
		sessionCookie = lucia.createSessionCookie(session.id);
	} else {
		sessionCookie = lucia.createBlankSessionCookie();
	}

	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes,
	});
};

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
	}
}
