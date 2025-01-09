import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

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

categorySchema.plugin(uniqueValidator, " is already taken.");

export default mongoose?.models?.Category ||
	mongoose.model("Category", categorySchema);
