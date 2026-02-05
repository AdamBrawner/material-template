import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import ArsNetworkLogo from "../../assets/ars_network_logo.svg";
import ArsLogo from "../../assets/ars-logo.png";
import { useUser } from "../../context/UserContext";
import AppTheme from "../../theme/AppTheme";
import ThemeSwitcher from "../ThemeSwitcher";
import { OktaIcon } from "./CustomIcons";

const ForgotPassword = React.lazy(() => import("./ForgotPassword"));

const enableForgotPassword = false;

const Card = styled(MuiCard)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignSelf: "center",
	width: "100%",
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	margin: "auto",
	[theme.breakpoints.up("sm")]: {
		maxWidth: "450px",
	},
	boxShadow:
		"hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
	...theme.applyStyles("dark", {
		boxShadow:
			"hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
	}),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
	minHeight: "100dvh",
	width: "100vw",
	boxSizing: "border-box",
	padding: theme.spacing(2),
	[theme.breakpoints.up("sm")]: {
		padding: theme.spacing(4),
	},
	alignItems: "center",
	justifyContent: "center",
	overflowY: "auto",
	position: "relative",
	"&::before": {
		content: '""',
		display: "block",
		position: "absolute",
		zIndex: -1,
		inset: 0,
		backgroundImage:
			"radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
		backgroundRepeat: "no-repeat",
		...theme.applyStyles("dark", {
			backgroundImage:
				"radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
		}),
	},
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {
	const [usernameError, setUsernameError] = React.useState(false);
	const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");
	const [passwordError, setPasswordError] = React.useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
	const [open, setOpen] = React.useState(false);
	const user = useUser();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (usernameError || passwordError) {
			return;
		}
		const data = new FormData(event.currentTarget);
		const username = data.get("username") as string;
		console.log({
			username,
			password: data.get("password"),
		});
		//localStorage.setItem("username", username);
		user.setUsername(username);
	};

	const validateInputs = () => {
		const username = document.getElementById("username") as HTMLInputElement;
		const password = document.getElementById("password") as HTMLInputElement;

		let isValid = true;

		if (!username.value) {
			setUsernameError(true);
			setUsernameErrorMessage("Please enter a valid username.");
			isValid = false;
		} else {
			setUsernameError(false);
			setUsernameErrorMessage("");
		}

		if (!password.value || password.value.length < 6) {
			setPasswordError(true);
			setPasswordErrorMessage("Password must be at least 6 characters long.");
			isValid = false;
		} else {
			setPasswordError(false);
			setPasswordErrorMessage("");
		}

		return isValid;
	};

	return (
		<AppTheme {...props}>
			<CssBaseline enableColorScheme />
			<SignInContainer direction="column" justifyContent="space-between">
				<ThemeSwitcher
					sx={{
						position: "fixed",
						top: "1rem",
						right: "1rem",
						borderColor: "divider",
					}}
				/>
				<Card variant="outlined">
					<img
						src={ArsLogo}
						alt="ARS Logo"
						style={{ width: "50%", height: "auto", alignSelf: "center" }}
					/>
					<Typography
						component="h1"
						variant="h4"
						sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
					>
						ARS Unify Login
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{
							display: "flex",
							flexDirection: "column",
							width: "100%",
							gap: 2,
						}}
					>
						<FormControl>
							<FormLabel htmlFor="username">User Name</FormLabel>
							<TextField
								error={usernameError}
								helperText={usernameErrorMessage}
								id="username"
								type="text"
								name="username"
								autoComplete="username"
								autoFocus
								required
								fullWidth
								variant="outlined"
								color={usernameError ? "error" : "primary"}
							/>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor="password">Password</FormLabel>
							<TextField
								error={passwordError}
								helperText={passwordErrorMessage}
								name="password"
								placeholder="••••••"
								type="password"
								id="password"
								autoComplete="current-password"
								autoFocus
								required
								fullWidth
								variant="outlined"
								color={passwordError ? "error" : "primary"}
							/>
						</FormControl>
						{false && (
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/>
						)}
						{enableForgotPassword && (
							<ForgotPassword open={open} handleClose={handleClose} />
						)}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							onClick={validateInputs}
						>
							Sign in
						</Button>
						{enableForgotPassword && (
							<Link
								component="button"
								type="button"
								onClick={handleClickOpen}
								variant="body2"
								sx={{ alignSelf: "center" }}
							>
								Forgot your password?
							</Link>
						)}
					</Box>
					<Divider>or</Divider>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
						<Button
							fullWidth
							variant="outlined"
							onClick={() => user.setUsername("bauto@ars.com")}
							startIcon={
								<img
									src={ArsNetworkLogo}
									alt="ARS Corporate Network"
									style={{ width: 24, height: 24 }}
								/>
							}
						>
							Sign in on ARS Corporate Network
						</Button>
						<Button
							fullWidth
							variant="outlined"
							onClick={() => alert("Sign in with Okta")}
							startIcon={<OktaIcon />}
						>
							Sign in with Okta
						</Button>
						<Typography sx={{ textAlign: "center" }}>
							Don&apos;t have an account?{" "}
							<Link
								href="mailto:ithelp@ars.com"
								variant="body2"
								sx={{ alignSelf: "center" }}
							>
								Contact IT Help Desk
							</Link>
						</Typography>
					</Box>
				</Card>
			</SignInContainer>
		</AppTheme>
	);
}
