import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import type { ConfirmDialogProps } from "./types";
import { useDialogLoadingButton } from "./useDialogLoadingButton";

export function ConfirmDialog({ open, payload, onClose }: ConfirmDialogProps) {
	const cancelButtonProps = useDialogLoadingButton(() => onClose(false));
	const okButtonProps = useDialogLoadingButton(() => onClose(true));

	return (
		<Dialog maxWidth="xs" fullWidth open={open} onClose={() => onClose(false)}>
			<DialogTitle>{payload.title ?? "Confirm"}</DialogTitle>
			<DialogContent>{payload.msg}</DialogContent>
			<DialogActions>
				<Button autoFocus disabled={!open} {...cancelButtonProps}>
					{payload.cancelText ?? "Cancel"}
				</Button>
				<Button color={payload.severity} disabled={!open} {...okButtonProps}>
					{payload.okText ?? "Ok"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
