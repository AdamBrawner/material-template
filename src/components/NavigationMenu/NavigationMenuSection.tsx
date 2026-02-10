import List from "@mui/material/List";
import type * as React from "react";
import { MINI_DRAWER_WIDTH } from "./constants";
import NavigationMenuDividerItem from "./NavigationMenuDividerItem";
import NavigationMenuHeaderItem from "./NavigationMenuHeaderItem";
import NavigationMenuPageItem from "./NavigationMenuPageItem";
import type { NavigationMenuSectionState } from "./types";

interface NavigationMenuSectionProps {
	section: NavigationMenuSectionState;
	mini?: boolean;
}

const NavigationMenuSection: React.FC<NavigationMenuSectionProps> = ({
	section,
	mini = false,
}: NavigationMenuSectionProps) => {
	return (
		<List
			dense
			sx={{
				padding: mini ? 0 : 0.5,
				mb: 4,
				width: mini ? MINI_DRAWER_WIDTH : "auto",
			}}
		>
			<NavigationMenuHeaderItem>{section.title}</NavigationMenuHeaderItem>
			{section.pages?.map((pageState) => (
				<NavigationMenuPageItem
					key={pageState.page.title}
					id={pageState.page.title}
					title={pageState.page.title}
					icon={pageState.page.icon}
					href={pageState.page.href}
					defaultExpanded={pageState.defaultExpanded}
					expanded={pageState.expanded}
					selected={pageState.selected}
				/>
			))}
			<NavigationMenuDividerItem />
		</List>
	);
};

export default NavigationMenuSection;
