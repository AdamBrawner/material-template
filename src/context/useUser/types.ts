export interface UserContextValue {
	username: string;
	setUsername: React.Dispatch<React.SetStateAction<string>>;
	logout: () => void;
}
