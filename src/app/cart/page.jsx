"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import CartItem from "@/app/components/CartItem";

import { useCart } from "@/app/contexts/Cart";

const Cart = () => {
	// const { cart, dispatchCartAction } = useContext(CartContext);
	const { cart, clearCart } = useCart();
	const { status } = useSession();

	let totalAmount = 0;
	cart.forEach((item) => (totalAmount += item.price * item.quantity));

	// const callbackUrl =
	// 	window && typeof window === undefined ? "/" : window.location.pathname;

	return (
		<>
			<div className="account-setting__content">
				<div className="account-setting__content__title">
					<h4>Product list in your cart</h4>
				</div>
				<div className="product-table-container">
					<table>
						<thead>
							<tr>
								<th>Product Image</th>
								<th>PRODUCT NAME</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Subtotal</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{cart.map((item) => (
								<CartItem key={item._id} item={item} />
							))}
						</tbody>
					</table>
				</div>
				<h2 className="total-price">
					You Total Price Will be $ {totalAmount}
				</h2>
				<div
					style={{ display: "flex", justifyContent: "space-around" }}
				>
					<div className="mt-50">
						<button
							onClick={() => clearCart()}
							type="button"
							className=""
						>
							Clear Cart
						</button>
					</div>
				</div>

				<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2">
							<div className="d-flex justify-content-end my-4">
								{status !== "authenticated" ? (
									<Link
										className="btn btn-primary btn-raised col-6"
										href={`/login?callbackUrl=${"/cart"}`}
									>
										Login to Proceed to CheckOut
									</Link>
								) : (
									<Link
										className="btn btn-primary btn-raised col-6"
										href={`/checkout`}
										aria-disabled={
											status !== "authenticated"
										}
									>
										Proceed to CheckOut
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

// disabled = {!authContext.isLoggedIn}

export default Cart;
