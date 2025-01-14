import { NextResponse } from "next/server";
import connectDb from "@/utils/db";
import Product from "@/models/product";
import queryString from "query-string";

export async function GET(req) {
	await connectDb();
	// retrieving the query params
	const searchParams = queryString.parseUrl(req.url).query;
	const { page } = searchParams || {};
	console.log(page, "page");

	//api/product
	// {page: 5}

	const pageSize = 3;
	try {
		const currentPage = Number(page) || 1;
		// calculating the skip number
		const skip = (currentPage - 1) * pageSize;
		// skip    = (5 - 1) * 5
		// skip = 20
		// 24        (5 - 1) * 6
		// = 4 * 6
		// 24
		// total number of documents in product collection
		const totalProducts = await Product.countDocuments();
		console.log(totalProducts, "to");
		// 25 -> 26 -> 27 -> 28 -> 29 -> 30
		// db_product_count -> 100
		// apple -> 30
		// page ->

		const products = await Product.find({}) // apple -> 30
			.skip(skip)
			// the number of documents returned by mongodb after implementing the skip
			.limit(pageSize)
			.sort({ createdAt: -1 });

		// response back to your react app
		return NextResponse.json({
			products,
			currentPage,
			totalPages: Math.ceil(totalProducts / pageSize),
		});
	} catch (err) {
		return NextResponse.json(
			{
				err: err.message,
			},
			{ status: 500 },
		);
	}
}
