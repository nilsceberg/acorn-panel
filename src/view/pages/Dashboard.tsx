import * as React from "react";

import { PageProps, PageContainer } from "./Page";
import { Pages } from "../../model/Pages";
import { Button } from "@material-ui/core";
import { observer } from "mobx-react";

export interface DashboardProps extends PageProps {

}

export const Dashboard = observer((props: DashboardProps) => {
	const { model } = props;
	return (
		<PageContainer page={Pages.Dashboard} model={model}>
			Acorn Control Panel
		</PageContainer>
	)
});
