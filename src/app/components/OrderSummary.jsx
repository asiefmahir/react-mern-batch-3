"use client";

import { useCart } from "@/app/contexts/Cart";
import Image from "next/image";

export default function OrderSummary() {
	const { cart } = useCart();

	const calculateTotal = () => {
		return cart?.reduce(
			(total, item) => total + item?.price * item?.quantity,
			0,
		);
	};

	const totalItems = cart?.reduce((total, item) => total + item.quantity, 0);

	const itemOrItems = totalItems === 1 ? "item" : "items";

	return (
		<div>
			<p className="alert alert-primary">Order Summary</p>
			<ul className="list-unstyled">
				{cart?.map((product) => (
					<div className="card mb-3" key={product?._id}>
						<div className="row g-0 d-flex align-items-center p-1">
							<div className="col-lg-3">
								<div
									style={{
										// height: "100px",
										overflow: "hidden",
									}}
								>
									<Image
										src={
											product?.image?.secure_url ||
											"/images/default.jpeg"
										}
										className="card-img-top"
										width={500}
										height={300}
										style={{
											objectFit: "cover",
											height: "100%",
											width: "100%",
										}}
										alt={product?.title}
									/>
								</div>
							</div>

							<div className="col-lg-6">
								<p className="card-title text-secondary">
									{product?.title}
								</p>
							</div>
							<div className="col-lg-3">
								<p className="h6">
									${product?.price?.toFixed(2)}
								</p>
								<p className="text-secondary">
									Qty: {product?.quantity}
								</p>
							</div>
						</div>
					</div>
				))}
			</ul>

			<div className="d-flex justify-content-between p-1">
				<p>
					Total {totalItems} {itemOrItems}:{" "}
				</p>
				<p className="h4">{calculateTotal().toFixed(2)}</p>
			</div>
		</div>
	);
}
