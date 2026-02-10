export interface UserDTO {
	username: string;
	userRightIds: number[];
	token?: string;
	email?: string;
}

export interface UserContextValue {
	info?: UserDTO;
	/** with immer so you can do normal assignment */
	setInfo: React.Dispatch<React.SetStateAction<UserDTO | undefined>>;
	logout: () => void;
	isAuthorized: () => boolean;
	hasAccessRight: (requiredRight: number) => boolean;
}
