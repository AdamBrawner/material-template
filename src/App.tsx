import UnifyApp from "./components/UnifyApp";
import { UserContextProvider } from "./context/useUser";

function App() {
	return (
		<UserContextProvider>
			<UnifyApp />
		</UserContextProvider>
	);
}

export default App;
