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
			</ul>
		</div>
	);
};

export default Nav;
