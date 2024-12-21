import { useContext, useState, useEffect, createContext } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
	return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	const [role, setRole] = useState("");

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, initializeUser);
		return unsubscribe;
	}, []);

	async function initializeUser(user) {
		if (user) {
			setCurrentUser({ ...user });
			const docRef = doc(db, "users", user.uid);
			const docSnap = await getDoc(docRef);
			const roleFromDb = docSnap.data().role;
			setRole(roleFromDb);

			setUserLoggedIn(true);
		} else {
			setCurrentUser(null);
			setUserLoggedIn(false);
			setRole("");
		}

		setLoading(false);
	}

	const abc = {
		userLoggedIn,
		currentUser,
		setCurrentUser,
		role,
	};

	return (
		<AuthContext.Provider value={abc}>
			{!loading && children}
		</AuthContext.Provider>
	);
}

{
	/* <AuthProvider>
	{() => return a + b}
</AuthProvider>; */
}

{
	/* <div>
	<h2></h2>
</div> */
}
