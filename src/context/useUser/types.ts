export interface UserDTO {
	username: string;
	accessRights: number[];
	token?: string;
	email?: string;
}

export interface UserContextValue {
	info?: UserDTO;
	setInfo: React.Dispatch<React.SetStateAction<UserDTO | undefined>>;
	logout: () => void;
	isAuthorized: () => boolean;
	hasAccessRight: (requiredRight: number) => boolean;
}
