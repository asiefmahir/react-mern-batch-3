import { useState } from "react";

import { useNavigate } from "react-router";
import { useAddProductMutation } from "../features/api/apiSlice";
import { toast } from "react-toastify";

const AddProductForm = () => {
	const [product, setProduct] = useState({
		title: "",
		price: "",
		image: "",
		description: "",
	});
	const navigate = useNavigate();
	const [addProduct] = useAddProductMutation();

	const handleChange = (e) => {
		setProduct({
			...product,
			[e.target.name]:
				e.target.name === "price"
					? Number(e.target.value)
					: e.target.value,
		});
	};

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		console.log(file);
		const data = new FormData();
		data.append("file", file);
		data.append("upload_preset", "our-first-project");
		data.append("cloud_name", "dcdga3gke");
		const res = await fetch(
			`https://api.cloudinary.com/v1_1/dcdga3gke/image/upload`,
			{
				method: "POST",
				body: data,
			},
		);

		const result = await res.json();
		console.log(result);
		setProduct({ ...product, image: result.secure_url });
	};
	// [api.reducerPath] : api.reducer

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!product.image) {
			toast("Image is Uploading, please wait...");
			return;
		}
		await addProduct(product);
		navigate("/");
	};

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
				<p>Image URL:</p>

				{product.image && (
					<img
						src={product.image}
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
