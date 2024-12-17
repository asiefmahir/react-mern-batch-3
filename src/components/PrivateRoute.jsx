import { useAuth } from "../contexts/Auth";
import { Navigate } from "react-router";

export default function PrivateUserRoute({ children }) {
	const { userLoggedIn } = useAuth();

	return userLoggedIn ? children : <Navigate to="/" />;
}
