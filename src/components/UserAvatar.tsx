import { Avatar, Stack } from "@mui/material";
import type React from "react";
import { useUser } from "../context/useUser";
import UserAvatarOptionsMenu from "./UserAvatarOptionsMenu";

export const UserAvatar: React.FC = () => {
	const { info } = useUser();
	const username = info?.username || "";
	return (
		<Stack
			direction="row"
			sx={{
				p: 2,
				gap: 1,
				alignItems: "center",
				borderTop: "1px solid",
				borderColor: "divider",
			}}
		>
			<Avatar
				sizes="small"
				sx={{ width: 36, height: 36, bgcolor: "info.main" }}
				title={username}
			>
				{username[0]?.toUpperCase()}
			</Avatar>
			<UserAvatarOptionsMenu />
		</Stack>
	);
};

export default UserAvatar;
