import * as React from "react";

import { PageProps, PageContainer } from "./Page";
import { Pages } from "../../model/Pages";
import { Button, Paper, Table, TableHead, TableRow, TableCell, Checkbox, TableBody } from "@material-ui/core";
import { observer } from "mobx-react";

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { ScreensController } from "../../controllers/ScreensController";

export interface ScreensProps extends PageProps {
	controller: ScreensController
}

export const Screens = observer((props: ScreensProps) => {
	const { model, controller } = props;
	return (
		<PageContainer page={Pages.Screens} model={model} loading={model.screensLoading}>
			<Paper>
				<Table size="medium">
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox">
								<Checkbox/>
							</TableCell>
							<TableCell>
								Name
							</TableCell>
							<TableCell>
								Uuid
							</TableCell>
							<TableCell>
								Connected
							</TableCell>
							<TableCell>
								Identify
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							model.screens.map(
								screen => (
									<TableRow key={screen.uuid}>
										<TableCell padding="checkbox">
											<Checkbox/>
										</TableCell>
										<TableCell>
											{screen.name}
										</TableCell>
										<TableCell>
											{screen.uuid}
										</TableCell>
										<TableCell>
											{
												screen.connected !== null ? <FiberManualRecordIcon htmlColor={screen.connected ? "green" : "red"}/> : null
											}
											
										</TableCell>
										<TableCell>
											<Checkbox color="primary" checked={screen.identify} onClick={async () => screen.identify = await controller.setIdentify(screen.uuid, !screen.identify)}>Identify</Checkbox>
										</TableCell>
									</TableRow>
								)
							)
						}
					</TableBody>
				</Table>
			</Paper>
		</PageContainer>
	)
});
