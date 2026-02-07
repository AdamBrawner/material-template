import LinearProgress from "@mui/material/LinearProgress";
import * as React from "react";
import { useUser } from "../context/useUser";
import { ErrorBoundary } from "./ErrorBoundary";

const NotAuthorized = React.lazy(() => import("./NotAuthorized"));
const SignIn = React.lazy(() => import("./SignIn"));

interface AuthorizedRoutesProps {
	AppRouter: React.ComponentType;
	requiredAccessRight: number;
}

/** If authorized, show app with nav menu. If not, show sign in page. */
export const AuthorizedRoutes: React.FC<AuthorizedRoutesProps> = ({
	AppRouter,
	requiredAccessRight,
}) => {
	const { isAuthorized, hasAccessRight } = useUser();
	if (!isAuthorized())
		return (
			<React.Suspense fallback={<LinearProgress />}>
				<ErrorBoundary>
					<SignIn />
				</ErrorBoundary>
			</React.Suspense>
		);
	return (
		<React.Suspense fallback={<LinearProgress />}>
			{hasAccessRight(requiredAccessRight) ? <AppRouter /> : <NotAuthorized />}
		</React.Suspense>
	);
};

export default AuthorizedRoutes;
