import { Avatar, Stack } from "@mui/material";
import type React from "react";
import { useUser } from "../context/useUser";
import UserAvatarOptionsMenu from "./UserAvatarOptionsMenu";

export const UserAvatar: React.FC = () => {
	const user = useUser();
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
				alt={user.username}
				sx={{ width: 36, height: 36, bgcolor: "primary.main" }}
				title={user.username}
			>
				{user.username[0].toUpperCase()}
			</Avatar>
			<UserAvatarOptionsMenu />
		</Stack>
	);
};

export default UserAvatar;
