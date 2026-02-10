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
		const ok = !!info?.username.endsWith("@ars.com");
		if (ok && !info?.userRightIds.length) {
			console.warn(
				`${info?.username} seems to be authorized but has no access rights.`,
			);
		}
		return ok;
	};

	const hasAccessRight = (requiredRight: number) => {
		if (!info) return false;
		return info.userRightIds.some((right) => right === requiredRight);
	};

	return (
		<UserContext.Provider
			value={{ info, setInfo, logout, isAuthorized, hasAccessRight }}
		>
			{props.children}
		</UserContext.Provider>
	);
};

/** If you only want to check access rights, prefer useUserRightIds. Depends on UserContextProvider. */
export const useUser = () => {
	const context = React.useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be in a UserContextProvider");
	}
	return context;
};

/** Depends on UserContextProvider.
 * Example JSX: const { 21: canEdit, 32: canDelete } = useUserRightIds([21, 32]);
 * ...{canEdit && \<EditButton\>}
 * @returns an object with boolean values for each of the provided right ids, e.g. { 21: true, 32: false }
 */
export function useUserRightIds(checkRightIds: number[] = []) {
	const user = useUser();
	const userRightIds = user.info?.userRightIds ?? [];
	const result = Object.create(null);
	checkRightIds.forEach((rightId) => {
		result[rightId] = userRightIds.includes(rightId);
	});
	return result;
}
export default useUser;
