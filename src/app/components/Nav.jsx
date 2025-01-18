import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Nav = () => {
	const { data, status } = useSession();
	console.log(data, "data");
	console.log(status, "auth status");

	return (
		<header className="header">
			<div className="container">
				<nav className="header__navbar">
					<ul>
						<li>
							<Link href="/">Home</Link>
						</li>
						<li>
							<Link href="/shop">Shop</Link>
						</li>
						{status !== "authenticated" && (
							<li>
								<Link href="/register">Sign Up</Link>
							</li>
						)}
						{status === "authenticated" &&
							(data?.user?.role === "admin" ||
								data?.user?.role === "super-admin") && (
								<li>
									<Link href="/dashboard/admin/add-product">
										Add Product
									</Link>
								</li>
							)}

						<li>
							<Link href="/cart">Cart</Link>
						</li>
						<li>
							<Link href="/static-page">Static Page</Link>
						</li>

						<li>
							<Link href="/all-products">Products</Link>
						</li>
						{status === "authenticated" && (
							<button onClick={() => signOut()}>Logout</button>
						)}
						{status !== "authenticated" && (
							<li>
								<Link href="/login">Login</Link>
							</li>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Nav;
