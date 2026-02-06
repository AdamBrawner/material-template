"use client";
import Box from "@mui/material/Box";
import Container, { type ContainerProps } from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type * as React from "react";
import ErrorBoundary from "./ErrorBoundary";

const PageContentHeader = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-between",
	gap: theme.spacing(2),
}));

const PageHeaderToolbar = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	gap: theme.spacing(1),
	// Ensure the toolbar is always on the right side, even after wrapping
	marginLeft: "auto",
}));

export interface Breadcrumb {
	title: string;
	path?: string;
}
export interface PageContainerProps extends ContainerProps {
	children?: React.ReactNode;
	title?: string;
	breadcrumbs?: Breadcrumb[];
	actions?: React.ReactNode;
}

export default function PageContainer(props: PageContainerProps) {
	const { children, title, actions = null } = props;

	return (
		<Container sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
			<Stack sx={{ flex: 1, my: 2 }} spacing={2}>
				<Stack>
					<PageContentHeader>
						{title ? <Typography variant="h4">{title}</Typography> : null}
						<PageHeaderToolbar>{actions}</PageHeaderToolbar>
					</PageContentHeader>
				</Stack>
				<Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
					<ErrorBoundary>{children}</ErrorBoundary>
				</Box>
			</Stack>
		</Container>
	);
}
