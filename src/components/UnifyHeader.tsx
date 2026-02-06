import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router";
import ThemeSwitcher from "./ThemeSwitcher";
import UserAvatar from "./UserAvatar";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
	borderWidth: 0,
	borderBottomWidth: 1,
	borderStyle: "solid",
	borderColor: (theme.vars ?? theme).palette.divider,
	boxShadow: "none",
	zIndex: theme.zIndex.drawer + 1,
}));

const LogoContainer = styled("div")({
	position: "relative",
	height: 40,
	display: "flex",
	alignItems: "center",
	"& img": {
		maxHeight: 40,
	},
});

export interface UnifyHeaderProps {
	logo?: React.ReactNode;
	title?: string;
	menuOpen: boolean;
	onToggleMenu: (open: boolean) => void;
}

export default function UnifyHeader({
	logo,
	title,
	menuOpen,
	onToggleMenu,
}: UnifyHeaderProps) {
	const theme = useTheme();

	const handleMenuOpen = React.useCallback(() => {
		onToggleMenu(!menuOpen);
	}, [menuOpen, onToggleMenu]);

	const getMenuIcon = React.useCallback(
		(isExpanded: boolean) => {
			const expandMenuActionText = "Expand";
			const collapseMenuActionText = "Collapse";

			return (
				<Tooltip
					title={`${isExpanded ? collapseMenuActionText : expandMenuActionText} menu`}
					enterDelay={1000}
				>
					<div>
						<IconButton
							size="small"
							aria-label={`${isExpanded ? collapseMenuActionText : expandMenuActionText} navigation menu`}
							onClick={handleMenuOpen}
							sx={{ borderColor: "transparent" }}
						>
							{isExpanded ? <MenuOpenIcon /> : <MenuIcon />}
						</IconButton>
					</div>
				</Tooltip>
			);
		},
		[handleMenuOpen],
	);

	return (
		<AppBar
			position="absolute"
			sx={{
				backgroundColor: (theme.vars ?? theme).palette.primary.main,
				displayPrint: "none",
			}}
		>
			<Toolbar
				sx={{ backgroundColor: "transparent", mx: { xs: -0.75, sm: -1 } }}
			>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					sx={{
						flexWrap: "wrap",
						width: "100%",
					}}
				>
					<Stack direction="row" alignItems="center">
						<Box sx={{ mr: 1 }}>{getMenuIcon(menuOpen)}</Box>
						<Link to="/" style={{ textDecoration: "none" }}>
							<Stack direction="row" alignItems="center">
								{logo ? <LogoContainer>{logo}</LogoContainer> : null}
								{title ? (
									<Typography
										variant="h6"
										sx={{
											color: (theme.vars ?? theme).palette.primary.contrastText,
											fontWeight: "700",
											ml: 1,
											whiteSpace: "nowrap",
											lineHeight: 1,
										}}
									>
										{title}
									</Typography>
								) : null}
							</Stack>
						</Link>
					</Stack>
					<Stack
						direction="row"
						alignItems="center"
						spacing={1}
						sx={{ marginLeft: "auto" }}
					>
						<Stack direction="row" alignItems="center">
							<ThemeSwitcher sx={{ borderColor: "transparent" }} />
							<UserAvatar />
						</Stack>
					</Stack>
				</Stack>
			</Toolbar>
		</AppBar>
	);
}
