import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary";

const root = document.getElementById("root");
if (!root) throw new Error("Failed to find the root element");

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<ErrorBoundary showError>
			<App />
		</ErrorBoundary>
	</React.StrictMode>,
);
