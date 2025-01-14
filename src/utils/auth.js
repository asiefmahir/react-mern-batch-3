import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/models/user";
import bcrypt from "bcrypt";
import connectDb from "./db";

export const authOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials, req) {
				// login
				// console.log("authorize called", credentials);

				await connectDb();
				const { email, password } = credentials;
				// console.log(email, "cred");

				// fetch api -> dedicated backend

				const user = await User.findOne({ email: email });

				if (!user) {
					throw new Error("Invalid email or Password");
				}

				const isMatch = await bcrypt.compare(password, user.password);
				if (!isMatch) {
					throw new Error("Invalid Password");
				}

				return user;
			},
		}),
	],
	callbacks: {
		async signIn({ user }) {
			// console.log("signin called", user);
			if (user) {
				return true;
			}
		},
		jwt: async ({ token, user }) => {
			// console.log("jwt called", token);

			await connectDb();
			const userByEmail = await User.findOne({ email: token.email });
			userByEmail.password = undefined;
			token.user = userByEmail;
			return token;
		},
		session: async ({ session, token }) => {
			// console.log(`session called`, session);

			session.user = token.user;
			// console.log(session);

			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/login",
	},
};
