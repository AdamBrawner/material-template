import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@mui/material";
import React from "react";
import type { PromptDialogProps } from "./types";
import { useDialogLoadingButton } from "./useDialogLoadingButton";

export function PromptDialog({ open, payload, onClose }: PromptDialogProps) {
	const [input, setInput] = React.useState("");
	const cancelButtonProps = useDialogLoadingButton(() => onClose(null));

	const [loading, setLoading] = React.useState(false);

	const name = "input";
	// biome-ignore lint/suspicious/noExplicitAny: figure out event type details later
	const onSubmit: React.SubmitEventHandler = async (event: any) => {
		event.preventDefault();
		try {
			setLoading(true);
			const formData = new FormData(event.currentTarget);
			const value = formData.get(name) ?? "";

			if (typeof value !== "string") {
				throw new Error("Value must come from a text input.");
			}

			await onClose(value);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog
			maxWidth="xs"
			fullWidth
			open={open}
			onClose={() => onClose(null)}
			slotProps={{
				paper: {
					component: "form",
					onSubmit,
				},
			}}
		>
			<DialogTitle>{payload.title ?? "Confirm"}</DialogTitle>
			<DialogContent>
				<DialogContentText>{payload.msg} </DialogContentText>
				<TextField
					autoFocus
					required
					margin="dense"
					id="name"
					name={name}
					type="text"
					fullWidth
					variant="standard"
					value={input}
					onChange={(event) => setInput(event.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button disabled={!open} {...cancelButtonProps}>
					{payload.cancelText ?? "Cancel"}
				</Button>
				<Button disabled={!open} loading={loading} type="submit">
					{payload.okText ?? "Ok"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
