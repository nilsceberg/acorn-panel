import * as React from "react";
const clsx = require("clsx");

import { Model } from "../../model/Model";
import { PageInfo } from "../../model/Pages";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/styles";
import { CircularProgress } from "@material-ui/core";

export interface PageProps {
	model: Model;
}

export interface PageContainerProps {
	page: PageInfo;
	model: Model;
	loading?: boolean;
	children: any;
}

const useStyles = makeStyles(theme => ({
	container: {
		display: "none",
	},
	content: {
		display: "none",
	},
	spinner: {
		display: "none",
		textAlign: "center",
		marginTop: 200,
	},
	visible: {
		display: "block",
	}
}));

export const PageContainer = observer((props: PageContainerProps) => {
	const classes = useStyles(props);
	return (
		<div className={clsx(classes.container, props.model.page.identifier === props.page.identifier && classes.visible)}>
			<div className={clsx(classes.content, !props.loading && classes.visible)}>
				{props.children}
			</div>
			<div className={clsx(classes.spinner, props.loading && classes.visible)}>
				<CircularProgress size={120}/>
			</div>
		</div>
	);
});
