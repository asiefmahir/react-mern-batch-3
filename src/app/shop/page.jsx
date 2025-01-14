export const dynamic = "force-dynamic";

import ProductFilter from "@/app/components/ProductFilter";
import Pagination from "@/app/components/Pagination";
import ProductCard from "../components/ProductCard";

async function getProductsForShop(searchParams) {
	const searchQuery = new URLSearchParams({
		page: searchParams?.page || 1,
		minPrice: searchParams?.minPrice || "",
		maxPrice: searchParams?.maxPrice || "",
		category: searchParams?.category || "",
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
	const { products, currentPage, totalPages } = await getProductsForShop(
		searchParams,
	);
	console.log(totalPages, "t-page");

	return (
		<div className="container-fluid">
			<div className="row">
				<div
					className="col-lg-3 overflow-auto"
					style={{ maxHeight: "90vh" }}
				>
					<ProductFilter searchParams={searchParams} />
				</div>
				<div
					className="col-lg-9 overflow-auto"
					style={{ maxHeight: "90vh" }}
				>
					<h4 className="text-center fw-bold mt-3">
						Shop Latest products
					</h4>

					<div className="section__content">
						<div className="grid three">
							{products?.map((product) => (
								<ProductCard
									key={product._id}
									product={product}
								/>
							))}
						</div>
					</div>

					<br />

					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						searchParams={searchParams}
						pathname="/shop"
					/>
				</div>
			</div>
		</div>
	);
}
