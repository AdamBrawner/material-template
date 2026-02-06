import ListSubheader from "@mui/material/ListSubheader";
import type {} from "@mui/material/themeCssVarsAugmentation";
import { useNavigationMenuContext } from "../../context/NavigationMenuContext";
import { DRAWER_WIDTH } from "../../data/constants";
import { getDrawerSxTransitionMixin } from "./mixins";

export interface DashboardSidebarHeaderItemProps {
	children?: React.ReactNode;
}

export default function DashboardSidebarHeaderItem({
	children,
}: DashboardSidebarHeaderItemProps) {
	const sidebarContext = useNavigationMenuContext();
	const {
		mini = false,
		fullyExpanded = true,
		hasDrawerTransitions,
	} = sidebarContext;

	return (
		<ListSubheader
			sx={{
				fontSize: 12,
				fontWeight: "600",
				height: mini ? 0 : 36,
				...(hasDrawerTransitions
					? getDrawerSxTransitionMixin(fullyExpanded, "height")
					: {}),
				px: 1.5,
				py: 0,
				minWidth: DRAWER_WIDTH,
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
				zIndex: 2,
			}}
		>
			{children}
		</ListSubheader>
	);
}
