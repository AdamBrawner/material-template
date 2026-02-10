import * as React from "react";
import { createHashRouter, RouterProvider } from "react-router";

const DemoLayout = React.lazy(() => import("./DemoLayout"));
const DemoList = React.lazy(() => import("./DemoList"));
const NotAuthorized = React.lazy(() => import("./NotAuthorized"));

const router = createHashRouter([
	{
		Component: DemoLayout, // wraps UnifyLayout to provide App specific props
		children: [
			{
				path: "/",
				Component: DemoList,
			},
			// Fallback route
			{
				path: "*",
				Component: NotAuthorized,
			},
		],
	},
]);

/** Don't use Demo components in real apps */
export const DemoRouter = () => <RouterProvider router={router} />;
export default DemoRouter;
