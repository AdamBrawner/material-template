import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import LayersIcon from "@mui/icons-material/Layers";
import PersonIcon from "@mui/icons-material/Person";
import type { NavigationMenuSectionDTO } from "./types";

// readonly object preferred over enum
export const DemoAccessRights = {
	SalesReports: 1,
	TrafficReports: 2,
	Employees: 3,
	Basic: 4,
} as const;

/** each page must indicate if it's selected. pages with nested nav must indicate if default and currently expanded */
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
				requiresUserRightId: DemoAccessRights.Employees,
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
				requiresUserRightId: DemoAccessRights.Basic,
				pages: [
					{
						title: "Sales",
						icon: <DescriptionIcon />,
						href: "/reports/sales",
						requiresUserRightId: DemoAccessRights.SalesReports,
					},
					{
						title: "Traffic",
						icon: <DescriptionIcon />,
						href: "/reports/traffic",
						requiresUserRightId: DemoAccessRights.TrafficReports,
					},
				],
			},
			{
				title: "Integrations",
				icon: <LayersIcon />,
				href: "/integrations",
				requiresUserRightId: DemoAccessRights.Basic,
			},
		],
	},
] as const;
