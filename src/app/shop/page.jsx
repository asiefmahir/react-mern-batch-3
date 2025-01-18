export const dynamic = "force-dynamic";

import ProductFilter from "@/app/components/ProductFilter";
import Pagination from "@/app/components/Pagination";
import ProductCard from "../components/ProductCard";

async function getProductsForShop(upd) {
	const searchQuery = new URLSearchParams({
		page: upd?.page || 1,
		minPrice: upd?.minPrice || "",
		maxPrice: upd?.maxPrice || "",
		category: upd?.category || "",
	}).toString();
	console.log(searchQuery, "ssss");

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API}/api/product/filters?${searchQuery}`,
			{
				method: "GET",
				cache: "no-store",
			},
		);
		if (!response.ok) {
			throw new Error("Failed to fetch products");
		}
		const data = await response.json();

		return data;
	} catch (err) {
		console.log(err);
		return { products: [], currentPage: 1, totalPages: 1 };
	}
}

export default async function Shop({ searchParams }) {
	//   console.log("searchParams in shop page => ", searchParams);
	const { page, minPrice, maxPrice, category } = await searchParams;
	const upd = { page, minPrice, maxPrice, category };
	console.log(upd, "upd");

	const { products, currentPage, totalPages } = await getProductsForShop(upd);
	console.log(totalPages, "t-page");

	return (
		<div className="container-fluid">
			<div className="row">
				<div
					className="col-lg-3 overflow-auto"
					style={{ maxHeight: "90vh" }}
				>
					<ProductFilter />
				</div>
				<div className="col-lg-9" style={{ maxHeight: "90vh" }}>
					<h4 className="text-center fw-bold mt-3">
						Shop Latest products
					</h4>

					{products.length > 0 ? (
						<div className="row">
							<div className="grid three">
								{products?.map((product) => (
									<ProductCard
										key={product._id}
										product={product}
									/>
								))}
							</div>
						</div>
					) : (
						<h4 className="text-center">No products found</h4>
					)}

					<br />

					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						pathname="/shop"
					/>
				</div>
			</div>
		</div>
	);
}
