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
	// remove pages the user doesn't have access to
	const accessiblePages = menuSections.map((section) => ({
		...section,
		pages: filterPagesByUserRights(section.pages, userRightIds),
	}));
	// remove pages that have no href and no pages
	const accessiblePagesWithHref = accessiblePages.map((section) => ({
		...section,
		pages: section.pages.filter(
			(page) => page.href || (page.pages && page.pages.length > 0),
		),
	}));
	// remove empty sections
	const nonEmptySections = accessiblePagesWithHref.filter(
		(section) => section.pages.length > 0,
	);
	// create menu section states with selected and expanded properties for pages
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
			pages: page.pages && filterPagesByUserRights(page.pages, userRightIds),
		}));
}

function selectAndExpandPages(
	pages: readonly NavigationMenuPageDTO[],
	pathname: string,
	expandedItemIds: string[],
): NavigationMenuPageState[] {
	return pages.map((page) => {
		const targetPath = page.selectForSubPaths ? `${page.href}/*` : page.href;
		const selected = !!targetPath && !!matchPath(targetPath, pathname);
		const onNestedPage = page.pages?.some((nestedPage) =>
			matchPath(`${nestedPage.href}/*`, pathname),
		);
		const expanded = expandedItemIds.includes(page.title) || !!onNestedPage;
		const pages = page.pages
			? selectAndExpandPages(page.pages, pathname, expandedItemIds)
			: undefined;
		return {
			page,
			selected,
			expanded,
			pages,
		};
	});
}
