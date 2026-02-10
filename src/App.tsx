import DemoRouter from "./components/DemoRouter";
import { DemoAccessRights } from "./components/NavigationMenu/DemoNavigationMenu";
import UnifyApp from "./components/UnifyApp";
import { UserContextProvider } from "./context/useUser";

function App() {
	return (
		<UserContextProvider>
			<UnifyApp
				requireUserRight={DemoAccessRights.Basic}
				AppRouter={DemoRouter}
			/>
		</UserContextProvider>
	);
}

export default App;
