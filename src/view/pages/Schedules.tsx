import * as React from "react";

import { PageProps, PageContainer } from "./Page";
import { Pages } from "../../model/Pages";
import { Button, Paper, Table, TableHead, TableRow, TableCell, Checkbox, TableBody, IconButton, withStyles, Theme } from "@material-ui/core";
import { observer } from "mobx-react";
import MaterialTable from "material-table";

import { ExpandLess as IconUp, ExpandMore as IconDown, Language as WebIcon, Help as QuestionIcon } from "@material-ui/icons";

import { SchedulesController } from "../../controllers/SchedulesController";
import { makeStyles } from "@material-ui/styles";
import { Classes } from "jss";

export interface SchedulesProps extends PageProps {
	controller: SchedulesController;
	classes?: Classes;
}

export const Schedules = observer((props: SchedulesProps) => {
	const { model, controller } = props;
	return (
		<PageContainer page={Pages.Schedules} model={model} loading={false}>
			<MaterialTable
				isLoading={model.schedulesLoading}
				options={{ selection: true }}
				columns={[
					{
						title: "Name",
						field: "name",
						type: "string",
					},
					{
						title: "Playlist",
						field: "playlist.name",
						type: "string",
					},
				]}
				title="Schedules"
				data={model.schedules}/>
		</PageContainer>
	)
});

