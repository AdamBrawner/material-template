export interface NavigationMenuPageDTO {
	title: string;
	icon?: React.ReactNode;
	href?: string;
	requiresUserRightId?: number;
	selectForSubPaths?: boolean;
	/** passed along, but not implemented */
	defaultExpanded?: boolean;
	/** nested navigation disables link to href */
	pages?: NavigationMenuPageDTO[];
}

export interface NavigationMenuPageState {
	page: NavigationMenuPageDTO;
	expanded: boolean;
	selected: boolean;
	/** nested navigation disables link to href */
	pages?: NavigationMenuPageState[];
}

export interface NavigationMenuSectionDTO {
	title?: string;
	pages: NavigationMenuPageDTO[];
}

export interface NavigationMenuSectionState {
	title?: string;
	pages: NavigationMenuPageState[];
}

export interface NavigationIntegration {
	/** All possible app navigation menu sections. Other data will be used to derive NavigationMenuSectionStates from these. */
	menuSections: readonly NavigationMenuSectionDTO[];
	/** from router, used with matchPath to mark pages selected. When a page is selected, its parent will be expanded if possible. */
	pathname: string;
	/** state from NavigationMenu to expand items the user has chosen to expand.  */
	expandedItemIds: string[];
	/** from JWT */
	userRightIds: number[];
}
