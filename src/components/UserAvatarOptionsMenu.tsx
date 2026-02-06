import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import Divider, { dividerClasses } from "@mui/material/Divider";
import MuiLink from "@mui/material/Link";
import { listClasses } from "@mui/material/List";
import ListItemIcon, { listItemIconClasses } from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import { paperClasses } from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useUser } from "../context/useUser";
import MenuButton from "./MenuButton";

const MenuItem = styled(MuiMenuItem)({
	margin: "2px 0",
});

export default function UserAvatarOptionsMenu() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const { logout } = useUser();
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleLogout = () => {
		handleClose();
		logout();
	};

	return (
		<React.Fragment>
			<MenuButton
				aria-label="Open menu"
				onClick={handleClick}
				sx={{ borderColor: "transparent" }}
			>
				<MoreVertRoundedIcon />
			</MenuButton>
			<Menu
				anchorEl={anchorEl}
				id="menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
				sx={{
					[`& .${listClasses.root}`]: {
						padding: "4px",
					},
					[`& .${paperClasses.root}`]: {
						padding: 0,
					},
					[`& .${dividerClasses.root}`]: {
						margin: "4px -4px",
					},
				}}
			>
				<MenuItem>
					<MuiLink
						component="a"
						underline="none"
						color="inherit"
						href="https://unify.ars.com/UnifyAdmin/MyAccount"
					>
						<ListItemText>My Account</ListItemText>
					</MuiLink>
				</MenuItem>

				<MenuItem>
					<MuiLink
						component="a"
						underline="none"
						color="inherit"
						href="https://unify.ars.com"
					>
						<ListItemText>Unify Apps</ListItemText>
					</MuiLink>
				</MenuItem>

				<Divider />
				<MenuItem
					onClick={handleLogout}
					sx={{
						[`& .${listItemIconClasses.root}`]: {
							ml: "auto",
							minWidth: 0,
						},
					}}
				>
					<ListItemText>Logout</ListItemText>
					<ListItemIcon>
						<LogoutRoundedIcon fontSize="small" />
					</ListItemIcon>
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
}
