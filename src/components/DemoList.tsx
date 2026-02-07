import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import useDialogs from "../context/useDialogs";
import useNotifications from "../context/useNotifications";
import PageContainer from "./PageContainer";

export default function DemoList() {
	const dialogs = useDialogs();
	const notifications = useNotifications();

	const pageTitle = "Employees";

	function handleRefresh() {
		notifications.show("This is a demo notification", { severity: "success" });
	}

	function handleCreateClick() {
		dialogs.alert("This is a demo dialog.");
	}

	return (
		<PageContainer
			title={pageTitle}
			breadcrumbs={[{ title: pageTitle }]}
			actions={
				<Stack direction="row" alignItems="center" spacing={1}>
					<Tooltip title="Reload data" placement="right" enterDelay={1000}>
						<div>
							<IconButton
								size="small"
								aria-label="refresh"
								onClick={handleRefresh}
							>
								<RefreshIcon />
							</IconButton>
						</div>
					</Tooltip>
					<Button
						variant="contained"
						onClick={handleCreateClick}
						startIcon={<AddIcon />}
					>
						Create
					</Button>
				</Stack>
			}
		>
			<Box sx={{ flex: 1, width: "100%" }}>
				<Box sx={{ flexGrow: 1 }}>
					<Alert>
						This is just a demo page. Click buttons to see dialogs and
						notifications in action.
					</Alert>
				</Box>
			</Box>
		</PageContainer>
	);
}
