import { useState } from "react";
import { auth } from "../firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";

const SignupForm = () => {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	console.log(auth?.currentUser?.email);

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		await createUserWithEmailAndPassword(auth, user.email, user.password);
		// console.log(user);
	};
	return (
		<form onSubmit={submitHandler}>
			<input
				type="text"
				name="email"
				value={user.email}
				onChange={handleChange}
				required
			/>
			<input
				type="password"
				name="password"
				value={user.password}
				onChange={handleChange}
				required
			/>
			<button type="submit">Signup</button>
		</form>
	);
};

export default SignupForm;
