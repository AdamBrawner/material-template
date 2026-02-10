import { matchPath } from "react-router";
import type {
	NavigationIntegration,
	NavigationMenuPageDTO,
	NavigationMenuPageState,
	NavigationMenuSectionState,
} from "./types";

/**  given the menu sections, current pathname, and expanded item ids, return new menu sections with selected and expanded booleans set appropriately */
export function createNavigationMenuSectionStates({
	menuSections,
	pathname,
	expandedItemIds,
	userRightIds,
}: NavigationIntegration): NavigationMenuSectionState[] {
	// filter out pages the user doesn't have access to
	const accessiblePages = menuSections.map((section) => ({
		...section,
		pages: filterPagesByUserRights(section.pages, userRightIds),
	}));
	const nonEmptySections = accessiblePages.filter(
		(section) => section.pages.length > 0,
	);
	return nonEmptySections.map((section) => ({
		...section,
		pages: selectAndExpandPages(section.pages, pathname, expandedItemIds),
	}));
}

function filterPagesByUserRights(
	pages: readonly NavigationMenuPageDTO[],
	userRightIds: number[],
): NavigationMenuPageDTO[] {
	return pages
		.filter(
			(page) =>
				!page.requiresUserRightId ||
				userRightIds.includes(page.requiresUserRightId),
		)
		.map((page) => ({
			...page,
			pages: page.pages
				? filterPagesByUserRights(page.pages, userRightIds)
				: undefined,
		}));
}

function selectAndExpandPages(
	pages: readonly NavigationMenuPageDTO[],
	pathname: string,
	expandedItemIds: string[],
): NavigationMenuPageState[] {
	return pages.map((page) => {
		const targetPath = page.selectForSubPaths ? `${page.href}/*` : page.href;
		const selected = !!matchPath(targetPath, pathname);
		// may need selected logic for pathname === "/", but let's see if this works first
		const canExpand = !!page.pages?.length;
		const expanded = canExpand && expandedItemIds.includes(page.title);
		const pages = page.pages
			? selectAndExpandPages(page.pages, pathname, expandedItemIds)
			: undefined;
		return {
			page,
			defaultExpanded: selected && canExpand,
			selected,
			expanded,
			pages,
		};
	});
}
