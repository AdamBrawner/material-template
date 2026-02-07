import * as React from "react";

export const NavigationMenuContext = React.createContext<{
	onPageItemClick: (id: string, hasNestedNavigation: boolean) => void;
	mini: boolean;
	fullyExpanded: boolean;
	fullyCollapsed: boolean;
	hasDrawerTransitions: boolean;
} | null>(null);

export function useNavigationMenuContext() {
	const context = React.useContext(NavigationMenuContext);
	if (!context) {
		throw new Error("NavigationMenu context was used without a provider.");
	}
	return context;
}

// nav menu creates nested contexts
export default NavigationMenuContext;
