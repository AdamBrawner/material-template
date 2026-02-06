import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import type { AlertDialogProps } from "./types";
import { useDialogLoadingButton } from "./useDialogLoadingButton";

export function AlertDialog({ open, payload, onClose }: AlertDialogProps) {
	const okButtonProps = useDialogLoadingButton(() => onClose());

	return (
		<Dialog maxWidth="xs" fullWidth open={open} onClose={() => onClose()}>
			<DialogTitle>{payload.title ?? "Alert"}</DialogTitle>
			<DialogContent>{payload.msg}</DialogContent>
			<DialogActions>
				<Button disabled={!open} {...okButtonProps}>
					{payload.okText ?? "Ok"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
