"use client";
import { useEffect, useState } from "react";
import { priceRanges } from "@/utils/filteredData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function ProductFilter() {
	const [categories, setCategories] = useState([]);
	const pathname = "/shop";
	const params = useSearchParams();

	const getCategories = async () => {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/category`, {
			method: "GET",
			next: { revalidate: 1 },
		});
		const data = await res.json();
		setCategories(data);
	};

	useEffect(() => {
		getCategories();
	}, []);

	const router = useRouter();
	// console.log(router);

	const activeButton = "btn btn-primary btn-raised mx-1 rounded-pill";
	const button = "btn btn-raised mx-1 rounded-pill";

	const handleRemoveFilter = (filterName) => {
		// const updatedSearchParams = { ...searchParams };
		// const updatedSearchParams = useSearchParams();
		// delete updatedSearchParams[filterName];
		let newParams = new URLSearchParams(params.toString());

		// if filterName is string
		if (typeof filterName === "string") {
			newParams.delete(filterName);
		}
		// if filterName is array
		if (Array.isArray(filterName)) {
			filterName?.forEach((name) => {
				newParams.delete(name);
			});
		}

		// reset page to 1 when applying new filtering options
		newParams.page = 1;

		const queryString = newParams.toString();
		console.log(queryString, "qs");

		const newUrl = `${pathname}?${queryString}`;
		router.push(newUrl);
	};

	const createQueryString = (name, value) => {
		let newParams = new URLSearchParams(params.toString());

		if (Array.isArray(name) && Array.isArray(value)) {
			// console.log(name, value, "val");

			// name =["minPrice", "maxPrice"]
			// value = [range?.min, range?.max]
			name.forEach((n, index) => {
				newParams.set(n, value[index]);
			});
			newParams.set("page", 1);

			return newParams.toString();
		}

		if (typeof name === "string") {
			newParams.set(name, value);
			newParams.set("page", 1);
			return newParams.toString();
		}
	};

	return (
		<div className="mb-5 overflow-scroll">
			<p className="lead">Filter Products</p>

			<Link className="text-danger" href="/shop">
				Clear Filters
			</Link>

			<p className="mt-4 alert alert-primary">Price</p>
			<div className="row d-flex align-items-center mx-1">
				{priceRanges?.map((range) => {
					console.log(params, "mini");

					const isActive =
						params.get("minPrice") === String(range?.min) &&
						params.get("maxPrice") === String(range?.max);
					return (
						<div key={range?.label}>
							<button
								className={isActive ? activeButton : button}
								onClick={() => {
									console.log(
										createQueryString(
											["minPrice", "maxPrice"],
											[range?.min, range?.max],
										),
									);
									router.push(
										`${pathname}?${createQueryString(
											["minPrice", "maxPrice"],
											[range?.min, range?.max],
										)}`,
									);
								}}
							>
								{range?.label}
							</button>
							{isActive && (
								<button
									onClick={() =>
										handleRemoveFilter([
											"minPrice",
											"maxPrice",
										])
									}
									className="pointer"
								>
									X
								</button>
							)}
						</div>
					);
				})}
			</div>

			<p className="mt-4 alert alert-primary">Categories</p>
			<div className="row d-flex align-items-center mx-1 filter-scroll">
				{categories?.map((c) => {
					const isActive = params.get("category") === c._id;

					return (
						<div key={c._id}>
							<button
								className={isActive ? activeButton : button}
								onClick={() => {
									router.push(
										`${pathname}?${createQueryString(
											"category",
											c._id,
										)}`,
									);
								}}
							>
								{c?.title}
							</button>
							{isActive && (
								<button
									onClick={() =>
										handleRemoveFilter("category")
									}
									className="pointer"
								>
									X
								</button>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
