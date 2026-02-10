import CssBaseline from "@mui/material/CssBaseline";
import { DialogsProvider } from "../context/useDialogs";
import { NotificationsProvider } from "../context/useNotifications";
import { UserContextProvider } from "../context/useUser";
import AppTheme from "../theme/AppTheme";
import { dataGridCustomizations } from "../theme/shared/customizations/dataGrid";
import { datePickersCustomizations } from "../theme/shared/customizations/datePickers";
import { formInputCustomizations } from "../theme/shared/customizations/formInput";
import { sidebarCustomizations } from "../theme/shared/customizations/sidebar";
import AuthorizedRoutes from "./AuthorizedRoutes";

const themeComponents = {
	...dataGridCustomizations,
	...datePickersCustomizations,
	...sidebarCustomizations,
	...formInputCustomizations,
};

interface UnifyAppProps {
	/** Generally this will be your RouterProvider. Router base Component should wrap UnifyLayout to provide props. */
	AppRouter: React.ComponentType;
	/** if given, user must have this right to access app routes */
	requireUserRight?: number;
	/** for debugging */
	disableCustomTheme?: boolean;
}

export default function UnifyApp({
	disableCustomTheme,
	requireUserRight,
	AppRouter,
}: UnifyAppProps) {
	return (
		<AppTheme
			disableCustomTheme={disableCustomTheme}
			themeComponents={themeComponents}
		>
			<CssBaseline enableColorScheme />
			<UserContextProvider>
				<NotificationsProvider>
					<DialogsProvider>
						<AuthorizedRoutes
							AppRouter={AppRouter}
							requireUserRight={requireUserRight}
						/>
					</DialogsProvider>
				</NotificationsProvider>
			</UserContextProvider>
		</AppTheme>
	);
}
