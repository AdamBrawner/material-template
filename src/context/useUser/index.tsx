import * as React from "react";
import { useImmer } from "use-immer";
import type { UserContextValue, UserDTO } from "./types";

/** don't export. the context can only be accessed via hooks in this module. */
const UserContext = React.createContext<UserContextValue | null>(null);

/** manage login and user rights. Access with useUser() */
export const UserContextProvider = (props: { children: React.ReactNode }) => {
	const [info, setInfo] = useImmer<UserDTO | undefined>(undefined);

	const logout = () => {
		setInfo(undefined);
	};
	const isAuthorized = () => {
		// TODO: check if the token is valid and not expired
		return !!info?.username.endsWith("@ars.com");
	};
	const hasAccessRight = (requiredRight: number) => {
		if (!info) return false;
		return info.accessRights.some((right) => right === requiredRight);
	};

	return (
		<UserContext.Provider
			value={{ info, setInfo, logout, isAuthorized, hasAccessRight }}
		>
			{props.children}
		</UserContext.Provider>
	);
};

/** Depends on UserContextProvider */
export const useUser = () => {
	const context = React.useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be in a UserContextProvider");
	}
	return context;
};

export default useUser;
