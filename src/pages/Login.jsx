import { useRef, useState } from "react";
import classes from "../form.module.css";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const submitHandler = async (event) => {
		event.preventDefault();
		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;
		setIsLoading(true);
		try {
			const res = await signInWithEmailAndPassword(
				auth,
				enteredEmail,
				enteredPassword,
			);
			if (res.user) {
				console.log("User logged in successfully", res.user);
				toast.success("User logged in successfully", {
					position: "top-right",
				});
			}
			setIsLoading(false);
			setErrorMessage("");
			navigate("/");
		} catch (error) {
			setErrorMessage(error.message);
			setIsLoading(false);
			console.log(error.message);
			toast.warning("Invalid email or password", {
				position: "top-right",
			});
		}
	};
	return (
		<section className={classes.auth}>
			<h1>Login</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor="email">Your Email</label>
					<input
						type="email"
						id="email"
						required
						ref={emailInputRef}
					/>
				</div>
				<div className={classes.control}>
					<label htmlFor="password">Your Password</label>
					<input
						type="password"
						id="password"
						required
						ref={passwordInputRef}
					/>
				</div>
				<div className={classes.actions}>
					{!isLoading && <button>Login</button>}
					{isLoading && <p>Sending request...</p>}
					{errorMessage && (
						<h3 style={{ color: "red" }}>{errorMessage}</h3>
					)}
				</div>
			</form>
		</section>
	);
};

export default Login;
