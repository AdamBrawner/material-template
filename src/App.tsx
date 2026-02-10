import DemoRouter from "./components/DemoRouter";
import { DemoAccessRights } from "./components/NavigationMenu/DemoNavigationMenu";
import UnifyApp from "./components/UnifyApp";

function App() {
	return (
		<UnifyApp
			requireUserRight={DemoAccessRights.Basic}
			AppRouter={DemoRouter}
		/>
	);
}

export default App;
