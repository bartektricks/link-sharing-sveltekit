import type { UserData } from '$lib/db/user';
import type { Cookies } from '@sveltejs/kit';

export const setSessionCookie = (cookies: Cookies, user: NonNullable<UserData>) => {
	cookies.set('user', btoa(JSON.stringify(user)), {
		path: '/',
		maxAge: 60 * 60 * 24 * 7, // 1 week
		httpOnly: true,
		sameSite: 'lax',
		secure: true,
	});
};

export const getSessionCookie = (cookies: Cookies): UserData => {
	const user = cookies.get('user');
	return user ? JSON.parse(atob(user)) : null;
};
