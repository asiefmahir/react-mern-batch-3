"use client";

import { useRouter } from "next/navigation";

const Pagination = ({ totalPages, pathname, searchParams }) => {
	const router = useRouter();
	const createQueryString = (name, value) => {
		// name = page; value = 2
		let params = new URLSearchParams(searchParams);

		params.set(name, value);
		return params.toString();
		//page=2
	};

	return (
		<div style={{ textAlign: "center" }}>
			<div>
				<nav>
					<ul
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						{Array.from({ length: totalPages }, (_, index) => {
							const page = index + 1;

							return (
								<li
									style={{
										marginRight: "10px",
										border: "1px solid blue",
										padding: "5px",
										backgroundColor: "aqua",
									}}
									key={page}
								>
									<button
										onClick={() => {
											// `/?page=2`
											router.push(
												`${pathname}?${createQueryString(
													"page",
													page,
												)}`,
											);
										}}
									>
										{page}
									</button>
								</li>
							);
						})}
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Pagination;
