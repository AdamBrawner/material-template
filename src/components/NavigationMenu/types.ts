export interface NavigationMenuPageDTO {
	title: string;
	icon?: React.ReactNode;
	href: string;
	requiresUserRightId?: number;
	/** nested navigation */
	pages?: NavigationMenuPageDTO[];
	selectForSubPaths?: boolean;
	//selectForRootPath?: boolean;
}

export interface NavigationMenuPageState {
	page: NavigationMenuPageDTO;
	expanded: boolean;
	selected: boolean;
	defaultExpanded?: boolean;
	/** nested navigation */
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
	menuSections: readonly NavigationMenuSectionDTO[];
	pathname: string;
	expandedItemIds: string[];
	userRightIds: number[];
}
