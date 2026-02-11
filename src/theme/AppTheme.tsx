import type { ThemeOptions } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { dataDisplayCustomizations } from "./shared/customizations/dataDisplay";
import { feedbackCustomizations } from "./shared/customizations/feedback";
import { inputsCustomizations } from "./shared/customizations/inputs";
import { navigationCustomizations } from "./shared/customizations/navigation";
import { surfacesCustomizations } from "./shared/customizations/surfaces";
import {
	colorSchemes,
	shadows,
	shape,
	typography,
} from "./shared/themePrimitives";

interface AppThemeProps {
	children: React.ReactNode;
	disableCustomTheme?: boolean;
	themeComponents?: ThemeOptions["components"];
}

// To include this in a package, need to inject /custom/brand.ts as prop instead of importing it directly in themePrimitives

export default function AppTheme(props: AppThemeProps) {
	const { children, disableCustomTheme, themeComponents } = props;
	const theme = React.useMemo(() => {
		return disableCustomTheme
			? {}
			: createTheme({
					// For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
					cssVariables: {
						colorSchemeSelector: "data-mui-color-scheme",
						cssVarPrefix: "template",
					},
					colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
					typography,
					shadows,
					shape,
					components: {
						...inputsCustomizations,
						...dataDisplayCustomizations,
						...feedbackCustomizations,
						...navigationCustomizations,
						...surfacesCustomizations,
						...themeComponents,
					},
				});
	}, [disableCustomTheme, themeComponents]);
	if (disableCustomTheme) {
		return <React.Fragment>{children}</React.Fragment>;
	}
	return (
		<ThemeProvider theme={theme} disableTransitionOnChange>
			{children}
		</ThemeProvider>
	);
}
