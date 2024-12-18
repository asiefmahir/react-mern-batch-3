import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { doc } from "firebase/firestore";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fakeBaseQuery(),
	tagTypes: ["products"],
	endpoints: (builder) => ({
		getAllProducts: builder.query({
			async queryFn() {
				try {
					const productsCollectionRef = collection(db, "products");
					const data = await getDocs(productsCollectionRef);
					const filteredData = data.docs.map((doc) => ({
						...doc.data(),
						id: doc.id,
					}));
					return { data: filteredData };
				} catch (error) {
					console.log(error);
					return { error: "Failed to fetch products" };
				}
			},
			providesTags: ["products"],
		}),

		addProduct: builder.mutation({
			queryFn: async (product) => {
				try {
					await addDoc(collection(db, "products"), product);
					return { data: product };
				} catch (error) {
					return { error };
				}
			},
			invalidatesTags: ["products"],
		}),
		removeProduct: builder.mutation({
			queryFn: async (id) => {
				try {
					const productDoc = doc(db, "products", id);
					await deleteDoc(productDoc);
					return { data: id };
				} catch (error) {
					console.log(error);
					return { error };
				}
			},
			invalidatesTags: ["products"],
		}),
	}),
});

export const {
	useGetAllProductsQuery,
	useAddProductMutation,
	useRemoveProductMutation,
} = apiSlice;
