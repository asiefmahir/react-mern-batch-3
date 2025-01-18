"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDb from "@/utils/db";
import Product from "@/models/product";

export async function addProduct(prevState) {
	try {
		await connectDb();
		const product = {
			title: prevState.title,
			description: prevState.description,
			price: Number(prevState.price),
			category: prevState.category,
			image: prevState.image,
		};
		await new Product(product).save();
	} catch (error) {
		console.log(error);
		return {
			message: "Error creating product",
		};
	}

	revalidatePath("/");
	// revalidatePath("/dashboard/admin/products");

	redirect("/");
}
