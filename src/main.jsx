import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./router/router";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./contexts/Auth";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./app/store";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<Provider store={store}>
				<RouterProvider router={router} />
				<ToastContainer />
			</Provider>
		</AuthProvider>
	</StrictMode>,
);
