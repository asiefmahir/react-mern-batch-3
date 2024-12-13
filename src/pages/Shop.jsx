import { useEffect, useState } from "react";

import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";

const Shop = () => {
	const [products, setProducts] = useState([]);
	const productsCollectionRef = collection(db, "products");
	useEffect(() => {
		const getProducts = async () => {
			const data = await getDocs(productsCollectionRef);
			const filteredData = data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setProducts(filteredData);
			console.log(filteredData);
		};
		getProducts();
	}, []);
	return <div>Shop</div>;
};

export default Shop;
