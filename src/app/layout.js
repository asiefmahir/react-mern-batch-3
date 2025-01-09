"use client";

import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import SessionProviderWrapper from "./components/SessionProvider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${poppins.className}`}>
				<SessionProviderWrapper>
					<Nav />
					{children}
				</SessionProviderWrapper>
			</body>
		</html>
	);
}
