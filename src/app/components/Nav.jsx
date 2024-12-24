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
							<Link href="/about">About</Link>
						</li>
						<li>
							<Link href="/team">Team</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Nav;
