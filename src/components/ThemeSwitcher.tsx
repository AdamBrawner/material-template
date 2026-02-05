import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton, { type IconButtonProps } from "@mui/material/IconButton";
import { useColorScheme, useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import type {} from "@mui/material/themeCssVarsAugmentation";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";

export default function ThemeSwitcher(props: { sx?: IconButtonProps["sx"] }) {
	const theme = useTheme();

	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const preferredMode = prefersDarkMode ? "dark" : "light";

	const { mode, setMode } = useColorScheme();

	const paletteMode = !mode || mode === "system" ? preferredMode : mode;

	const toggleMode = React.useCallback(() => {
		setMode(paletteMode === "dark" ? "light" : "dark");
	}, [setMode, paletteMode]);

	return (
		<Tooltip
			title={`${paletteMode === "dark" ? "Light" : "Dark"} mode`}
			enterDelay={600}
		>
			<div>
				<IconButton
					sx={props.sx}
					size="small"
					aria-label={`Switch to ${paletteMode === "dark" ? "light" : "dark"} mode`}
					onClick={toggleMode}
				>
					{theme.getColorSchemeSelector ? (
						<React.Fragment>
							<LightModeIcon
								sx={{
									display: "inline",
									[theme.getColorSchemeSelector("dark")]: {
										display: "none",
									},
								}}
							/>
							<DarkModeIcon
								sx={{
									display: "none",
									[theme.getColorSchemeSelector("dark")]: {
										display: "inline",
									},
								}}
							/>
						</React.Fragment>
					) : null}
				</IconButton>
			</div>
		</Tooltip>
	);
}
