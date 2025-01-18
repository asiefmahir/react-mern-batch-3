"use client";

import { useState, useEffect } from "react";
import { addProduct } from "@/app/actions/product";

const AddProductForm = () => {
	const [product, setProduct] = useState({
		title: "",
		price: "",
		image: "",
		category: "",
		description: "",
	});

	const [imgUrl, setImgUrl] = useState("");
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const getCategories = () => {
			fetch(`${process.env.NEXT_PUBLIC_API}/api/category`)
				.then((res) => res.json())
				.then((data) => {
					setCategories(data);
					setProduct((prev) => ({ ...prev, category: data[0]._id }));
				});
		};
		getCategories();
	}, []);

	const handleChange = (e) => {
		setProduct({
			...product,
			[e.target.name]:
				//  price:
				//  title: asdasdasd
				e.target.name === "price"
					? Number(e.target.value)
					: e.target.value,
		});
	};
	// // product.price = Number(product.price);
	// product["price"] =

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		console.log(file);
		const data = new FormData();
		//this is the file we send to cloudinary
		data.append("file", file);
		// this is the upload preset from our cloudinary account
		data.append("upload_preset", "our-first-project");
		// this is the cloud name from our cloudinary account
		data.append("cloud_name", "dcdga3gke");
		const res = await fetch(
			`https://api.cloudinary.com/v1_1/dcdga3gke/image/upload`,
			{
				method: "POST",
				body: data,
			},
		);

		const result = await res.json();
		const img = {
			public_id: result.public_id,
			secure_url: result.secure_url,
		};
		console.log(result, "res");
		// result.secure_url will held the image url.
		setProduct({ ...product, image: img });
		setImgUrl(result.secure_url);
	};
	// [api.reducerPath] : api.reducer

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!product.image) {
			return alert(`Please Wait until the image uploading is done`);
		}
		// await fetch(`http://localhost:4000/products`, {
		// 	method: "POST",
		// 	body: JSON.stringify(product),
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// });
		addProduct(product);
	};

	// const addProductWIthData = addProduct.bind(null, product);

	return (
		<>
			<form
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "center",
				}}
				onSubmit={handleSubmit}
				// action={addProductWIthData}
			>
				<p>Title:</p>
				<input
					value={product.title}
					onChange={handleChange}
					name="title"
					style={{ display: "block", width: "80%" }}
					required
				/>
				<br />
				<p>Price:</p>

				<input
					value={product.price}
					onChange={handleChange}
					name="price"
					style={{ display: "block", width: "80%" }}
					type="number"
					required
				/>
				<br />

				<p>Description:</p>
				<input
					value={product.description}
					onChange={handleChange}
					name="description"
					style={{ display: "block", width: "80%" }}
					type="text"
					required
				/>
				<br />
				<select
					name="category"
					id=""
					onChange={handleChange}
					value={product.category}
				>
					{categories?.map((cat) => (
						<option key={cat?._id} value={cat?._id}>
							{cat.title}
						</option>
					))}
				</select>
				<p>Image URL:</p>

				{product.image && (
					<img
						src={imgUrl}
						alt=""
						style={{ width: "100px", height: "100px" }}
					/>
				)}
				<input type="file" name="image" onChange={handleImageChange} />
				<br />
				<input type="submit" />
			</form>
		</>
	);
};

export default AddProductForm;
