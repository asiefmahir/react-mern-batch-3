"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import classes from "../login/login.module.css";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const router = useRouter();

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API}/api/register`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ name, email, password }),
				},
			);
			const data = await res.json();
			if (!res.ok) {
				setLoading(false);
				setErrorMessage(data?.err);
			} else {
				router.push("/login");
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
			setErrorMessage(error.message);
		}
	};

	return (
		<main>
			<section className={classes.auth}>
				<h1>Please Register</h1>
				<form onSubmit={submitHandler}>
					<div className={classes.control}>
						<label htmlFor="name">Your Name</label>
						<input
							type="text"
							id="name"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor="email">Your Email</label>
						<input
							type="email"
							id="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor="password">Your Password</label>
						<input
							type="password"
							id="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className={classes.actions}>
						{!isLoading && <button>Register</button>}
						{isLoading && <p>Creating New User</p>}
						{errorMessage && (
							<p style={{ color: "red" }}>{errorMessage}</p>
						)}
					</div>
				</form>
			</section>
		</main>
	);
};

export default Register;
