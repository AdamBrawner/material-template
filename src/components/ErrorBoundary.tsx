import React, {
	type ErrorInfo,
	type PropsWithChildren,
	type ReactNode,
} from "react";

type ErrorBoundaryProps = {
	/** notify server */
	logError?: (entry: ErrorLogEntry) => void;
	/** Allow user to see caught error.message */
	showError?: boolean;
	/** Override 'Something went wrong.' */
	messageToUser?: string;
	/** Included in logError ErrorLogEntry */
	messageToServer?: string;
	/** if provided, error will be cleared when location changes */
	location?: unknown;
};

type ErrorBoundaryState = {
	error?: Error;
};

export type ErrorLogEntry = {
	error: Error;
	errorInfo: ErrorInfo;
	messageToUser?: string;
	messageToServer?: string;
};

/** Provide fallback content in case of exception when rendering child components */
export class ErrorBoundary extends React.Component<
	PropsWithChildren<ErrorBoundaryProps>,
	ErrorBoundaryState
> {
	constructor(props: PropsWithChildren<ErrorBoundaryProps>) {
		super(props);
		this.state = { error: undefined };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		// Return new state. The next render will show the fallback UI.
		return { error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		const { logError, messageToUser, messageToServer } = this.props;
		// this.setState({ error, hasError: true });
		logError?.({ error, errorInfo, messageToUser, messageToServer });
	}

	componentDidUpdate(prevProps: ErrorBoundaryProps): void {
		if (this.props.location !== prevProps.location) {
			this.setState({ error: undefined });
		}
	}

	render(): ReactNode {
		if (this.state.error) {
			// fallback UI
			return (
				<div style={{ padding: "2em" }}>
					<h2>{this.props.messageToUser || "Something went wrong."}</h2>
					{this.props.showError ? <p>{this.state.error?.message}</p> : null}
				</div>
			);
		}
		// normal UI
		return this.props.children;
	}
}

export default ErrorBoundary;
