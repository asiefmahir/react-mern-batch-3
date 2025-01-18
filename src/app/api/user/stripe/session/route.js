import { NextResponse } from "next/server";
import connectDb from "@/utils/db";
import Product from "@/models/product";
import { getToken } from "next-auth/jwt";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
	await connectDb();
	const { cartItems } = await req.json();
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	const user = token?.user;

	try {
		const lineItems = await Promise.all(
			cartItems.map(async (item) => {
				const product = await Product.findById(item._id);
				const unitAmount = product.price * 100;
				return {
					price_data: {
						currency: "usd",
						product_data: {
							name: product.title,
							images: [product.image?.secure_url],
						},
						unit_amount: unitAmount,
					},
					quantity: item.quantity,
				};
			}),
		);

		const session = await stripe.checkout.sessions.create({
			line_items: lineItems,
			success_url: `${process.env.NEXT_PUBLIC_DOMAIN}`,
			client_reference_id: user._id,
			mode: "payment",
			payment_method_types: ["card"],
			payment_intent_data: {
				metadata: {
					cartItems: JSON.stringify(cartItems),
					userId: user._id,
				},
			},
			shipping_address_collection: {
				allowed_countries: ["US"],
			},
			customer_email: user?.email,
		});

		console.log("stripe checkout session => ", session);
		return NextResponse.json(session);
	} catch (err) {
		console.log(err);
		return NextResponse.json({
			err: "Server error. Please try again",
			status: 500,
		});
	}
}
