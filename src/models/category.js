import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minLength: 1,
			maxLength: 160,
		},
	},
	{ timestamps: true },
);

export default mongoose?.models?.Category ||
	mongoose.model("Category", categorySchema);
