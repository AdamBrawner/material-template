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
						<AuthorizedRoutes AppRouter={DemoRouter} requiredAccessRight={1} />
					</DialogsProvider>
				</NotificationsProvider>
			</UserContextProvider>
		</AppTheme>
	);
}
