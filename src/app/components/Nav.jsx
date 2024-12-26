import Link from "next/link";

const Nav = () => {
	return (
		<header className="header">
			<div className="container">
				<nav className="header__navbar">
					<ul>
						<li>
							<Link href="/">Home</Link>
						</li>

						<li>
							<Link href="/cart">Cart</Link>
						</li>

						<li>
							<Link href="/add-product">Add Product</Link>
						</li>

						<li>
							<Link href="/all-products">Products</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Nav;
