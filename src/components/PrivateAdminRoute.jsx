import { Navigate } from "react-router";
import { useAuth } from "../contexts/Auth";

export default function PrivateAdminRoute({ children }) {
	const { userLoggedIn, role } = useAuth();

	return userLoggedIn &&
		role &&
		(role === "admin" || role === "super-admin") ? (
		children
	) : (
		<Navigate to="/" />
	);
}

{
	/* <PrivateAdminRoute>
	
</PrivateAdminRoute> */
}
