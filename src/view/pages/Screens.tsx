import * as React from "react";

import { PageProps, PageContainer } from "./Page";
import { Pages } from "../../model/Pages";
import { Button, Paper, Table, TableHead, TableRow, TableCell, Checkbox, TableBody } from "@material-ui/core";
import { observer } from "mobx-react";

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export interface ScreensProps extends PageProps {

}

export const Screens = observer((props: ScreensProps) => {
	const { model } = props;
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
											<FiberManualRecordIcon htmlColor={"red"}/>
										</TableCell>
										<TableCell>
											<Checkbox color="primary">Identify</Checkbox>
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
