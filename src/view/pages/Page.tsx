import * as React from "react";
const clsx = require("clsx");

import { Model } from "../../model/Model";
import { PageInfo } from "../../model/Pages";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/styles";

export interface PageProps {
	model: Model;
}

export interface PageContainerProps {
	page: PageInfo;
	model: Model;
	children: any;
}

const useStyles = makeStyles(theme => ({
	container: {
		display: "none",
	},
	visible: {
		display: "block",
	}
}));

export const PageContainer = observer((props: PageContainerProps) => {
	const classes = useStyles(props);
	console.log(props.model.page.identifier, props.page.identifier);
	return (
		<div className={clsx(classes.container, props.model.page.identifier === props.page.identifier && classes.visible)}>
			{props.children}
		</div>
	);
});
