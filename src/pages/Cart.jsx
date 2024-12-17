import { useSelector, useDispatch } from "react-redux";

import CartItem from "../components/CartItem";
import { clearCart } from "../features/cart/cartSlice";

const Cart = () => {
	const cart = useSelector((storeState) => storeState.cart);
	const dispatch = useDispatch();

	let totalPrice = 0;
	cart.forEach((item) => (totalPrice += item.quantity * item.price));
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
								<th>Image</th>
								<th>PRODUCT Title</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Subtotal</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{cart.map((item) => (
								<CartItem item={item} key={item.id} />
							))}
						</tbody>
					</table>
				</div>
				<h2 className="total-price">
					You Total Price Will be $ {totalPrice}
				</h2>
				<div className="mt-50">
					<button
						onClick={() => dispatch(clearCart())}
						type="button"
						className="btn-big"
					>
						Clear Cart
					</button>
				</div>
			</div>
		</>
	);
};

// {type: "SOME"}
// {type: "", payload:}

export default Cart;
