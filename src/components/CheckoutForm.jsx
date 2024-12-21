import { useState } from "react";
import {
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

export const CheckoutForm = () => {
	const cart = useSelector((state) => state.cart);
	let totalPrice = 0;
	cart.forEach((item) => {
		totalPrice += item.price * item.quantity;
	});

	const stripe = useStripe();
	const elements = useElements();

	const [errorMessage, setErrorMessage] = useState("");
	const [emailInput, setEmailInput] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (elements == null || stripe == null) {
			return;
		}

		// Trigger form validation and wallet collection
		const { error: submitError } = await elements.submit();
		if (submitError?.message) {
			// Show error to your customer
			setErrorMessage(submitError.message);
			return;
		}

		// Create the PaymentIntent and obtain clientSecret from your server endpoint
		const res = await fetch(`${import.meta.env.VITE_STRIPE_BACKEND_URL}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				currency: "usd",
				amount: totalPrice * 100,
			}),
		});

		const { client_secret: clientSecret } = await res.json();
		// console.log(clientSecret, "clt");

		const { error } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {
				return_url: `${window.location.origin}`,
			},
		});

		if (error) {
			// This point will only be reached if there is an immediate error when
			// confirming the payment. Show error to your customer (for example, payment
			// details incomplete)
			setErrorMessage(error.message);
		} else {
			// Your customer will be redirected to your `return_url`. For some payment
			// methods like iDEAL, your customer will be redirected to an intermediate
			// site first to authorize the payment, then redirected to the `return_url`.
		}
	};

	return (
		<form onSubmit={handleSubmit} className="px-4">
			<div className="mb-3">
				<label htmlFor="email-input">Email</label>
				<div>
					<input
						value={emailInput}
						onChange={(e) => setEmailInput(e.target.value)}
						type="email"
						id="email-input"
						placeholder="johndoe@gmail.com"
					/>
				</div>
			</div>
			<PaymentElement />
			<button type="submit" disabled={!stripe || !elements}>
				Pay
			</button>

			{errorMessage && <div>{errorMessage}</div>}
		</form>
	);
};
