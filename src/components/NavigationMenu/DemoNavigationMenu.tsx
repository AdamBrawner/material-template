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
	Integrations: 5,
} as const;

/** each page must indicate if it's selected. pages with nested nav must indicate if default and currently expanded */
export const demoMenuItems: NavigationMenuSectionDTO[] = [
	{
		title: "Main pages",
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
			{
				title: "Reports",
				icon: <BarChartIcon />,
				requiresUserRightId: DemoAccessRights.Basic,
				pages: [
					{
						title: "Basic",
						icon: <BarChartIcon />,
						href: "/reports/basic",
						requiresUserRightId: DemoAccessRights.Basic,
					},
					{
						title: "Traffic",
						icon: <DescriptionIcon />,
						href: "/reports/traffic",
						requiresUserRightId: DemoAccessRights.Basic,
					},
				],
			},
			{
				title: "Deports",
				icon: <DescriptionIcon />,
				requiresUserRightId: DemoAccessRights.TrafficReports,
				defaultExpanded: true,
				pages: [
					{
						title: "Deport Basic",
						icon: <BarChartIcon />,
						href: "/deports/basic",
						requiresUserRightId: DemoAccessRights.TrafficReports,
					},
					{
						title: "Deport Traffic",
						icon: <DescriptionIcon />,
						href: "/deports/traffic",
						requiresUserRightId: DemoAccessRights.TrafficReports,
					},
				],
			},
		],
	},
	{
		title: "Secondary pages",
		pages: [
			{
				title: "Integrations",
				icon: <LayersIcon />,
				href: "/integrations",
				requiresUserRightId: DemoAccessRights.Integrations,
			},
			{
				title: "Disintegrations",
				icon: <BarChartIcon />,
				href: "/disintegrations",
				requiresUserRightId: DemoAccessRights.Basic,
			},
		],
	},
] as const;
