import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import Team from "../pages/Team";

import App from "../App";
import Root from "../pages/Root";
import NotFound from "../pages/NotFound";
import Notes, { loader, action } from "../pages/Notes";

// import "../index.css";

export const rootRouter = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <NotFound />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/about", element: <About /> },
			{ path: "/team", element: <Team /> },
			{
				path: "/notes",
				element: <Notes />,
				loader: loader,
				action: action,
			},
			// { path: "*", element: <NotFound /> },
		],
	},
]);
