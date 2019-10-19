import * as React from "react";

export const ScreenDetails = (props: { screen: any }) => {
	const { screen } = props;
	return (
		<div>
			Name: {screen.name}<br/>
			UUID: {screen.uuid}<br/>
			Schedule: {screen.schedule ? screen.schedule.name : "N/A"}<br/>
		</div>
	);
}
