import SignIn from "./components/SignIn";
import { UserContextProvider } from "./context/UserContext";

function App() {
	return (
		<UserContextProvider>
			<SignIn />
		</UserContextProvider>
	);
}

export default App;
