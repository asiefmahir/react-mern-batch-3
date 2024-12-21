import { Link } from "react-router";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../contexts/Auth";

const Nav = () => {
	const { userLoggedIn, role } = useAuth();

	return (
		<header className="header">
			<div className="container">
				<nav className="header__navbar">
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>

						{!userLoggedIn && (
							<li>
								<Link to="/sign-up">Sign Up</Link>
							</li>
						)}

						<li>
							<Link to="/cart">Cart</Link>
						</li>
						{userLoggedIn && (
							<li>
								<Link to="/checkout">Checkout</Link>
							</li>
						)}

						{userLoggedIn &&
							(role === "super-admin" || role === "admin") && (
								<li>
									<Link to="/add-product">Add Product</Link>
								</li>
							)}
						{userLoggedIn &&
							(role === "super-admin" || role === "admin") && (
								<li>
									<Link to="/all-products">Products</Link>
								</li>
							)}

						{!userLoggedIn && (
							<li>
								<Link to="/login">Login</Link>
							</li>
						)}

						<li>
							<Link to="/admin/order-list">Order List</Link>
						</li>

						{userLoggedIn && (
							<li>
								<button
									onClick={() => {
										signOut(auth);
									}}
								>
									Logout
								</button>
							</li>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Nav;
