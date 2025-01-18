"use client";

import { useState } from "react";
import { useCart } from "@/app/contexts/Cart";
import OrderSummary from "@/app/components/OrderSummary";

export default function Checkout() {
	const { cart } = useCart();
	const [loading, setLoading] = useState(false);

	const submitHandler = async () => {
		setLoading(true);
		try {
			const payload = {};
			const cartData = cart?.map((item) => ({
				_id: item._id,
				quantity: item.quantity,
			}));
			payload.cartItems = cartData;
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API}/api/user/stripe/session`,
				{
					method: "POST",
					body: JSON.stringify({ cartItems: cartData }),
				},
			);
			const data = await response.json();
			console.log(data);
			if (response.ok) {
				window.location.href = data.url;
			} else {
				// toast.error(data.err);
				setLoading(false);
			}
		} catch (err) {
			console.log(err);
			// toast.error("An error occured, please try again");
			setLoading(false);
		}
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-lg-8">
					<p className="alert alert-primary">Payment Method</p>
					<h2 className="text-center">🔒 💳</h2>

					<p className="lead card p-5 bg-secondary text-light">
						Clicking Place Order will securely redirect you to our
						trusted payment partner, Stripe to complete your order.
					</p>

					<div className="d-flex justify-content-end my-4">
						<button
							className="btn btn-success btn-raised col-6"
							onClick={submitHandler}
							disabled={loading}
						>
							{loading ? "Processing.." : "Place Order"}
						</button>
					</div>
				</div>

				<div className="col-lg-4">
					<OrderSummary />
				</div>
			</div>
		</div>
	);
}
