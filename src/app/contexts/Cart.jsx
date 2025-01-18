"use client";
import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const addToCart = (product) => {
		const exist = cart.find((item) => item._id === product._id);
		if (exist) {
			const updatedCart = cart.map((item) => {
				if (item._id === exist._id) {
					return { ...item, quantity: item.quantity + 1 };
				}
				return item;
			});
			setCart(updatedCart);
		} else {
			const newCart = [...cart, { ...product, quantity: 1 }];
			setCart(newCart);
		}
	};

	const updateQuantity = (id, quantity) => {
		const updatedCart = cart.map((item) => {
			if (item._id === id) {
				return { ...item, quantity: quantity };
			}
			return item;
		});
		setCart(updatedCart);
	};

	const removeFromCart = (id) => {
		const updatedCart = cart.filter((item) => item._id !== id);
		setCart(updatedCart);
	};
	const clearCart = () => {
		setCart([]);
	};

	// useEffect(() => {
	// 	const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
	// 	setCart(cartItems);
	// }, []);

	// useEffect(() => {
	// 	localStorage.setItem("cart", JSON.stringify(cart));
	// }, [cart, cart.length]);

	const ctxValue = {
		cart,
		addToCart,
		updateQuantity,
		removeFromCart,
		clearCart,
	};
	return (
		<CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);

// useCart()

export default CartProvider;
