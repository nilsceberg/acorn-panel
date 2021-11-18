import * as React from "react";

import { PageProps, PageContainer } from "./Page";
import { Pages } from "../../model/Pages";
import { Button, Paper, Table, TableHead, TableRow, TableCell, Checkbox, TableBody } from "@material-ui/core";
import { observer } from "mobx-react";
import MaterialTable from "material-table";

import { ScreensController } from "../../controllers/ScreensController";
import { ScreenDetails } from "./ScreenDetails";

export interface ScreensProps extends PageProps {
	controller: ScreensController
}

export const Screens = observer((props: ScreensProps) => {
	const { model, controller } = props;
	const Identify = observer((props: { screen: any }) => <Checkbox size="small" color="primary" checked={props.screen.identify} onClick={async () => props.screen.identify = await controller.setIdentify(props.screen.uuid, !props.screen.identify)}/>);
	return (
		<PageContainer page={Pages.Screens} model={model} loading={model.screensLoading}>
			<MaterialTable
				options={{
					selection: false,
					actionsColumnIndex: -1,
				}}
				editable={{
					isEditable: () => true,
					onRowUpdate: async () => {},
				}}
				parentChildData={(row, rows) => row.parent ? rows.find(p => p.uuid === row.parent.uuid) : undefined}
				columns={[
					{
						title: "Name",
						field: "name",
						type: "string",
						editable: "always",
					},
					{
						title: "Schedule",
						field: "schedule.name",
						type: "string",
						editable: "always",
					},
					{
						title: "Connected",
						field: "connected",
						type: "boolean",
						editable: "never",
					},
					{
						title: "Identify",
						field: "identify",
						type: "boolean",
						editable: "never",
						cellStyle: {
							padding: 0,
						},
						render: screen => <Identify screen={screen}/>
					},
				]}
				title="Screens" data={model.rootScreens}/>
		</PageContainer>
	)
});
