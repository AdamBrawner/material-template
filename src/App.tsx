import SignIn from "./components/SignIn";
import { UserContextProvider } from "./context/useUser";

function App() {
	return (
		<UserContextProvider>
			<SignIn />
		</UserContextProvider>
	);
}

export default App;
