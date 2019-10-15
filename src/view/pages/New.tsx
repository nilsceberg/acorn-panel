import * as React from "react";

import { PageProps, PageContainer } from "./Page";
import { Pages } from "../../model/Pages";
import { Button, Paper, Table, TableHead, TableRow, TableCell, Checkbox, TableBody } from "@material-ui/core";
import { observer } from "mobx-react";

export interface NewProps extends PageProps {

}

export const New = observer((props: NewProps) => {
	const { model } = props;
	return (
		<PageContainer page={Pages.New} model={model} loading={model.newLoading}>
			<Paper>
				<Table size="medium">
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox">
								<Checkbox/>
							</TableCell>
							<TableCell>
								Hostname
							</TableCell>
							<TableCell>
								Time
							</TableCell>
							<TableCell>
								IP
							</TableCell>
							<TableCell>
								UUID
							</TableCell>
							<TableCell>
								Action
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							model.pendingRegistrations.map(
								pending => (
									<TableRow key={pending.uuid}>
										<TableCell padding="checkbox">
											<Checkbox/>
										</TableCell>
										<TableCell>
											{pending.hostname}
										</TableCell>
										<TableCell>
											{new Date().toLocaleString()}
										</TableCell>
										<TableCell>
											{pending.ip}
										</TableCell>
										<TableCell>
											{pending.uuid}
										</TableCell>
										<TableCell>
											<Button color="primary">Accept</Button>
											<Button color="secondary">Reject</Button>
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
