import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useUser } from "../context/useUser";

export const NotAuthorized = () => {
	const { logout } = useUser();
	return (
		<Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
			<Alert severity="error">
				You are not authorized.
				<Button variant="outlined" onClick={logout} sx={{ ml: 2 }}>
					Log In
				</Button>
			</Alert>
		</Box>
	);
};

export default NotAuthorized;
