import Divider from "@mui/material/Divider";
import type {} from "@mui/material/themeCssVarsAugmentation";
import { useNavigationMenuContext } from "../../context/NavigationMenuContext";
import { getDrawerSxTransitionMixin } from "./mixins";

export default function DashboardSidebarDividerItem() {
	const sidebarContext = useNavigationMenuContext();
	const { fullyExpanded = true, hasDrawerTransitions } = sidebarContext;

	return (
		<li>
			<Divider
				sx={{
					borderBottomWidth: 1,
					my: 1,
					mx: -0.5,
					...(hasDrawerTransitions
						? getDrawerSxTransitionMixin(fullyExpanded, "margin")
						: {}),
				}}
			/>
		</li>
	);
}
