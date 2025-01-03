const products = [
	{
		id: "1",
		name: "Product 1",
		description: "Description for Product 1",
		price: 19.99,
		image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600",
	},
	{
		id: "2",
		name: "Product 2",
		description: "Description for Product 2",
		price: 29.99,
		image: "https://images.pexels.com/photos/1770650/pexels-photo-1770650.jpeg?auto=compress&cs=tinysrgb&w=600",
	},
	{
		id: "f04c",
		title: "Tomatoes",
		price: 256,
		image: "https://res.cloudinary.com/dcdga3gke/image/upload/v1735224313/n9rcip62nkdjzktnk2mf.jpg",
		description: "asdasdas",
	},
	{
		id: "fb83",
		title: "Content",
		price: 256,
		image: "https://res.cloudinary.com/dcdga3gke/image/upload/v1735224608/xtorfsquuahun5pgrogk.png",
		description: "asdasdasd",
	},
	{
		id: "b563",
		title: "cc",
		price: 89,
		image: "https://res.cloudinary.com/dcdga3gke/image/upload/v1735225479/auvedxzlzyhp7fuozqac.png",
		description: "sdsd",
	},
	{
		id: "be29",
		title: "Dummy Tomatoes",
		price: 256,
		image: "https://res.cloudinary.com/dcdga3gke/image/upload/v1735225705/o9cqacj2i8b7pshecubi.jpg",
		description: "Abc",
	},
	{
		id: "fc0c",
		title: "Testing Tomato",
		price: 259,
		image: "https://res.cloudinary.com/dcdga3gke/image/upload/v1735226340/unfghposhab6jiy15ze1.jpg",
		description: "asdas",
	},
	{
		id: "37bc",
		title: "demo tomato",
		price: 20,
		image: "https://res.cloudinary.com/dcdga3gke/image/upload/v1735227226/yuvqxxcukpzqzpooe7s4.jpg",
		description: "asdasd",
	},
];

import { v4 as uuidv4 } from "uuid";

export async function GET(request) {
	return Response.json(products);
}

export async function POST(request) {
	const data = await request.json();
	const newProduct = {
		...data,
		id: uuidv4(),
	};
	console.log(data);
	products.push(data);

	return Response.json({ message: "" }, { status: 201 });
}
