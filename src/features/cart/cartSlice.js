import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		addToCart(state, action) {
			const product = state.find((item) => item.id === action.payload.id);

			product
				? product.quantity++
				: state.push({ ...action.payload, quantity: 1 });
		},
		removeItemFromCart(state, action) {
			return state.filter((item) => item.id !== action.payload);
		},
		modifyQuantityOfAnItem(state, action) {
			const product = state.find((item) => item.id === action.payload.id);
			product.quantity = action.payload.quantity;
		},
		clearCart() {
			return [];
		},
	},
});

export const {
	addToCart,
	removeItemFromCart,
	clearCart,
	modifyQuantityOfAnItem,
} = cartSlice.actions;

export default cartSlice;
