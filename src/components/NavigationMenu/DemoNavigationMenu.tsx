import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import LayersIcon from "@mui/icons-material/Layers";
import PersonIcon from "@mui/icons-material/Person";
import type { NavigationMenuSectionDTO } from "./types";

/** each page must indicate if it's selected. pages with nested nav must indicate if default and currently expanded */
//export const demoMenuItems: MenuItemsFunction = (pathname, expandedItemIds) => {
//const baseItems: NavigationMenuSectionDTO[] = [
export const demoMenuItems: NavigationMenuSectionDTO[] = [
	{
		title: "Main items",
		pages: [
			{
				title: "Home",
				icon: <HomeIcon />,
				href: "/",
			},
			{
				title: "Employees",
				icon: <PersonIcon />,
				href: "/employees",
				selectForSubPaths: true,
			},
		],
	},
	{
		title: "Example items",
		pages: [
			{
				title: "Reports",
				icon: <BarChartIcon />,
				href: "/reports",
				pages: [
					{
						title: "Sales",
						icon: <DescriptionIcon />,
						href: "/reports/sales",
						requiresUserRightId: 1,
					},
					{
						title: "Traffic",
						icon: <DescriptionIcon />,
						href: "/reports/traffic",
						requiresUserRightId: 2,
					},
				],
			},
			{
				title: "Integrations",
				icon: <LayersIcon />,
				href: "/integrations",
			},
		],
	},
] as const;
