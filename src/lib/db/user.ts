import { hashPassword, verifyPassword } from '$lib/auth/password';
import type { Cookies } from '@sveltejs/kit';
import db from '.';
import { user as schemaUser } from './schema';
import { generateIdFromEntropySize } from 'lucia';
import { setSessionCookie } from '$lib/auth';

export const getUserData = async (email: string, password: string) => {
	const user = await db.query.user.findFirst({
		where: (user, { eq }) => eq(user.email, email),
	});

	const passwordMatch = user && (await verifyPassword(password, user.password));

	if (passwordMatch) {
		return {
			id: String(user.id),
			email: user.email,
		};
	}

	return null;
};

export type UserData = Awaited<ReturnType<typeof getUserData>>;

export const setUserData = async (
	{ email, password }: { email: string; password: string },
	cookies: Cookies,
) => {
	const hashedPass = await hashPassword(password);
	const userId = generateIdFromEntropySize(16);

	await db.insert(schemaUser).values({
		id: userId,
		email,
		password: hashedPass,
	});

	await setSessionCookie(userId, cookies);
};
