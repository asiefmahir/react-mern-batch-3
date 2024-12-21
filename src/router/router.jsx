import { createBrowserRouter } from "react-router";
import Shop from "../pages/Shop";
import Root from "../pages/Root";
import SignupForm from "../pages/SignupForm";
import Login from "../pages/Login";
import AddProductForm from "../pages/ProductAddForm";
import PrivateAdminRoute from "../components/PrivateAdminRoute";
import Cart from "../pages/Cart";
import Products from "../pages/AllProducts";
import Checkout from "../pages/Checkout";
import PrivateUserRoute from "../components/PrivateRoute";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{ path: "/", element: <Shop /> },
			{ path: "/sign-up", element: <SignupForm /> },
			{ path: "/login", element: <Login /> },
			{ path: "/cart", element: <Cart /> },
			{
				path: "/add-product",
				element: (
					<PrivateAdminRoute>
						<AddProductForm />
					</PrivateAdminRoute>
				),
			},
			{
				path: "/checkout",
				element: (
					<PrivateUserRoute>
						<Checkout />
					</PrivateUserRoute>
				),
			},
			{
				path: "/all-products",
				element: (
					<PrivateAdminRoute>
						<Products />
					</PrivateAdminRoute>
				),
			},
		],
	},
]);
