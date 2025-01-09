import mongoose from "mongoose";
// import Product from "@/models/product";
// import User from "@/models/user";

const cartItemSchema = new mongoose.Schema(
	{
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
		},
		title: String,
		price: Number,
		image: String,
		quantity: Number,
	},
	{ timestamps: true },
);

const orderSchema = new mongoose.Schema(
	{
		chargeId: String,
		payment_intent: { type: String },
		receipt_url: String,
		refunded: {
			type: Boolean,
			default: false,
		},
		status: String,
		amount: Number,
		currency: String,
		shipping: {
			address: {
				city: String,
				country: String,
				line1: String,
				line2: String,
				postal_code: String,
				state: String,
			},
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		cartItems: [cartItemSchema],
		delivery_status: {
			type: String,
			default: "Not Processed",
			enum: [
				"Not Processed",
				"Processing",
				"Dispatched",
				"Refunded",
				"Cancelled",
				"Delivered",
			],
		},
	},
	{ timestamps: true },
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
