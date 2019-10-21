import * as React from "react";
import { Paper } from "@material-ui/core";

export const ScreenDetails = (props: { screen: any }) => {
	const { screen } = props;
	return (
		<Paper>
			Name: {screen.name}<br/>
			UUID: {screen.uuid}<br/>
			Schedule: {screen.schedule ? screen.schedule.name : "N/A"}<br/>
		</Paper>
	);
}
