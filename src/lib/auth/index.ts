import { dev } from '$app/environment';
import { adapter } from '$lib/db';
import type { Cookies } from '@sveltejs/kit';
import { Lucia } from 'lucia';

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev,
		},
	},
	getUserAttributes: (attributes) => attributes,
});

export const setSessionCookie = async (id: string, cookies: Cookies) => {
	const session = await lucia.createSession(id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes,
	});
};

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

type DatabaseUserAttributes = {
	username: string;
};
