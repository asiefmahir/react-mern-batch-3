import { NextResponse } from "next/server";
import connectDb from "@/utils/db";
import Category from "@/models/category";

export async function GET(req) {
	try {
		await connectDb();
		const categories = await Category.find({}).sort({ createdAt: -1 });
		return NextResponse.json(categories);
	} catch (error) {
		return NextResponse.json(
			{
				err: error.message,
			},
			{ status: 500 },
		);
	}
}
