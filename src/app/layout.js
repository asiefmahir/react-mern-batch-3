"use client";

import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
// import "bootstrap-material-design/dist/css/bootstrap-material-design.min.css";

import Nav from "./components/Nav";
import SessionProviderWrapper from "./components/SessionProvider";
import CartProvider from "./contexts/Cart";

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
			<link
				rel="preload"
				href="bootstrap-material-design/dist/css/bootstrap-material-design.min.css"
				as="style"
			/>
			<body className={`${poppins.className}`}>
				<SessionProviderWrapper>
					<CartProvider>
						<Nav />
						{children}
					</CartProvider>
				</SessionProviderWrapper>
			</body>
		</html>
	);
}
