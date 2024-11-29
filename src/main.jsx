import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { rootRouter } from "./router/router.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("ourRoot")).render(
	<StrictMode>
		<RouterProvider router={rootRouter} />
	</StrictMode>,
);

// React Dom -> Main Dom /HTML             -> React App

// App()
// <App />
