import { Link } from "react-router";

const Nav = () => {
	return (
		<div>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/notes">Notes</Link>
				</li>
				<li>
					<Link to="/team">Team</Link>
				</li>
				<li>
					<Link to="/posts">Posts</Link>
				</li>
				<li>
					<Link to="/users">User List</Link>
				</li>
				<li>
					<Link to="/shop">Shop</Link>
				</li>
				<li>
					<Link to="/add-product">Add Product</Link>
				</li>
				<li>
					<Link to="/sign-up">Sign Up</Link>
				</li>
			</ul>
		</div>
	);
};

export default Nav;
