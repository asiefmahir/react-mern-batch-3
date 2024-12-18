import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
	reducer: {
		[cartSlice.name]: cartSlice.reducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (gM) => gM().concat(apiSlice.middleware),
});
