import { Outlet } from "react-router";
import Nav from "../components/Nav";

export default function Root() {
	return (
		<>
			<div id="sidebar">
				<Nav />
			</div>
			<div id="detail">
				<Outlet />
			</div>
		</>
	);
}
