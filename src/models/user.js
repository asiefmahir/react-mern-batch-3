import mongoose from "mongoose";
// import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
			minLength: 1,
			maxLength: 20,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			index: true,
			lowercase: true,
			unique: true,
			trim: true,
			minLength: 5,
			maxLength: 30,
		},
		password: String,
		role: {
			type: String,
			default: "user",
		},
	},
	{ timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", userSchema);
