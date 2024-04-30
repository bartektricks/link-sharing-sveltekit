import { hashPassword, verifyPassword } from '$lib/auth/password';
import db from '.';
import { users } from './schema';

export const getUserData = async (email: string, password: string) => {
	const user = await db.query.users.findFirst({
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

export const setUserData = async ({ email, password }: { email: string; password: string }) => {
	const hashedPass = await hashPassword(password);

	await db.insert(users).values({
		email,
		password: hashedPass,
	});
};
