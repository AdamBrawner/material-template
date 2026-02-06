import * as React from "react";
import type { UserContextValue } from "./types";

/** don't export. the context can only be accessed via hooks in this module. */
const UserContext = React.createContext<UserContextValue | null>(null);

/** manage login and user rights. Access with useUser() */
export const UserContextProvider = (props: { children: React.ReactNode }) => {
	const [username, setUsername] = React.useState<string>("");

	const logout = () => {
		setUsername("");
	};

	return (
		<UserContext.Provider value={{ username, setUsername, logout }}>
			{props.children}
		</UserContext.Provider>
	);
};

/** Depends on UserContextProvider */
export const useUser = () => {
	const context = React.useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserContextProvider");
	}
	return context;
};

export default useUser;
