import CssBaseline from "@mui/material/CssBaseline";
import { DialogsProvider } from "../context/useDialogs";
import { NotificationsProvider } from "../context/useNotifications";
import { UserContextProvider } from "../context/useUser";
import AppTheme from "../theme/AppTheme";
import {
	dataGridCustomizations,
	datePickersCustomizations,
	formInputCustomizations,
	sidebarCustomizations,
} from "../theme/shared/customizations";
import AuthorizedRoutes from "./AuthorizedRoutes";
import DemoRouter from "./DemoRouter";

const themeComponents = {
	...dataGridCustomizations,
	...datePickersCustomizations,
	...sidebarCustomizations,
	...formInputCustomizations,
};

export default function UnifyApp(props: { disableCustomTheme?: boolean }) {
	return (
		<AppTheme
			disableCustomTheme={props.disableCustomTheme}
			themeComponents={themeComponents}
		>
			<CssBaseline enableColorScheme />
			<UserContextProvider>
				<NotificationsProvider>
					<DialogsProvider>
						<AuthorizedRoutes AppRouter={DemoRouter} />
					</DialogsProvider>
				</NotificationsProvider>
			</UserContextProvider>
		</AppTheme>
	);
}
