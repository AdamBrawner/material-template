import LinearProgress from "@mui/material/LinearProgress";
import * as React from "react";
import { useUser } from "../context/useUser";
import { ErrorBoundary } from "./ErrorBoundary";

const NotAuthorized = React.lazy(() => import("./NotAuthorized"));
const SignIn = React.lazy(() => import("./SignIn"));

interface AuthorizedRoutesProps {
	AppRouter: React.ComponentType;
}

/** If authorized, show app with nav menu. If not, show sign in page. */
export const AuthorizedRoutes: React.FC<AuthorizedRoutesProps> = ({
	AppRouter,
}) => {
	const { username } = useUser();
	if (!username)
		return (
			<React.Suspense fallback={<LinearProgress />}>
				<ErrorBoundary>
					<SignIn />
				</ErrorBoundary>
			</React.Suspense>
		);
	const signedIn = username.endsWith("@ars.com");
	return (
		<React.Suspense fallback={<LinearProgress />}>
			{signedIn ? <AppRouter /> : <NotAuthorized />}
		</React.Suspense>
	);
};

export default AuthorizedRoutes;
