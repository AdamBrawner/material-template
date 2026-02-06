import * as React from "react";
import { createHashRouter, RouterProvider } from "react-router";

const UnifyLayout = React.lazy(() => import("./UnifyLayout"));
const DemoList = React.lazy(() => import("./DemoList"));
const NotAuthorized = React.lazy(() => import("./NotAuthorized"));

const router = createHashRouter([
	{
		Component: UnifyLayout,
		children: [
			{
				path: "/",
				Component: DemoList,
			},
			// Fallback route for the example routes in dashboard sidebar items
			{
				path: "*",
				Component: NotAuthorized,
			},
		],
	},
]);

export const DemoRouter = () => <RouterProvider router={router} />;
export default DemoRouter;
