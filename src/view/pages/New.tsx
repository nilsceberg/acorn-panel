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
		<PageContainer page={Pages.New} model={model} loading={model.newLoading}>
			{JSON.stringify(model.pendingRegistrations)}
		</PageContainer>
	)
});
