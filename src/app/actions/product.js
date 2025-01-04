"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const addProduct = async (data) => {
	console.log("Hello");
	await fetch(`http://localhost:4000/products`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});
	// revalidatePath("/");
	revalidateTag("products");
	redirect("/");
};
