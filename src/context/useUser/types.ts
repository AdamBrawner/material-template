export interface UserDTO {
	username: string;
	userRightIds: number[];
	token?: string;
	email?: string;
}

export interface UserContextValue {
	info: UserDTO;
	/** login */
	setInfo: React.Dispatch<React.SetStateAction<UserDTO>>;
	logout: () => void;
	isAuthorized: () => boolean;
	hasAccessRight: (requiredRight: number) => boolean;
}
