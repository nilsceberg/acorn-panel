import * as React from "react";

import { PageProps, PageContainer } from "./Page";
import { Pages } from "../../model/Pages";
import { Button } from "@material-ui/core";
import { observer } from "mobx-react";

export interface NewProps extends PageProps {

}

export const New = observer((props: NewProps) => {
	const { model } = props;
	return (
		<PageContainer page={Pages.New} model={model} loading={true}>
			DASHBOARD, WHOA!
			{model.systemMessage}
			<Button onClick={() => props.model.systemMessage = "CLICKED!" } variant="contained" color="primary">Log In</Button>
		</PageContainer>
	)
});
