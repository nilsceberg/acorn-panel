import * as React from "react";

import { PageProps, PageContainer } from "./Page";
import { Pages } from "../../model/Pages";
import { Button, Paper, Table, TableHead, TableRow, TableCell, Checkbox, TableBody, IconButton, withStyles, Theme } from "@material-ui/core";
import { observer } from "mobx-react";
import MaterialTable from "material-table";

import { ExpandLess as IconUp, ExpandMore as IconDown, Language as WebIcon, Help as QuestionIcon } from "@material-ui/icons";

import { PlaylistsController } from "../../controllers/PlaylistsController";
import { makeStyles } from "@material-ui/styles";
import { Classes } from "jss";

export interface PlaylistsProps extends PageProps {
	controller: PlaylistsController;
	classes?: Classes;
}

const playlistStyles = (theme: Theme) => ({
	background: {
		backgroundColor: theme.palette.grey[200],
		padding: theme.spacing(1),
	}
});

export const Playlist = withStyles(playlistStyles)(observer((props: { playlist: any } & PlaylistsProps) => {
	const { model, playlist, controller, classes } = props;
	return (
		<div className={classes.background}>
			<MaterialTable
				options={{
					search: false,
					showTitle: true,
					paging: false,
					toolbar: true,
					actionsColumnIndex: -1,
				}}
				editable={{
					isEditable: playlist => true,
					onRowUpdate: async (oldData, newData) => {
						await controller.editPlaylistItem(playlist, oldData, newData);
					},
					onRowAdd: async (data) => {
						await controller.addPlaylistItem(playlist, data);
					},
					onRowDelete: async (data) => {
						await controller.deletePlaylistItem(playlist, data)
					},
				}}
				isLoading={model.playlistLoading[playlist.uuid]}
				columns={[
					{
						field: "index",
						editable: "never",
						type: "string",
						render: item => {
							if (item === undefined) {
								return <div/>;
							}
							return (
								<div>
									<IconButton style={{padding:0}} disabled={item.index === 0} onClick={() => controller.movePlaylistItem(playlist, item, -1)}><IconUp/></IconButton>
									<IconButton style={{padding:0}} disabled={item.index === playlist.items.length - 1} onClick={() => controller.movePlaylistItem(playlist, item, 1)}><IconDown/></IconButton>
								</div>
							);
						}
					},
					{
						title: "Name",
						field: "name",
						type: "string",
					},
					{
						title: "Type",
						field: "type",
						type: "string",
						editable: "never",
						render: item => (
							(item && item.type === "WEBSITE") ? <WebIcon titleAccess="Website"/> : <QuestionIcon/>
						)
					},
					{
						title: "URL",
						field: "settings.url",
						type: "string",
					},
					{
						title: "Duration",
						field: "settings.duration",
						type: "numeric",
						render: value => value ? <span>{(value as any).settings.duration} second{(value as any).settings.duration === 1 ? "" : "s"}</span> : <span/>,
					},
				]}
			title={<span><span style={{color: "gray"}}>Playlist:</span> <span>{playlist.name}</span></span>}
			data={playlist.items}
			/>
		</div>
	)
}));

export const Playlists = observer((props: PlaylistsProps) => {
	const { model, controller } = props;
	return (
		<PageContainer page={Pages.Playlists} model={model} loading={false}>
			<MaterialTable
				isLoading={model.playlistsLoading}
				options={{ selection: true }}
				detailPanel={[{
					render: playlist => <Playlist playlist={playlist} {...props}/>
				}]}
				columns={[
					{
						title: "Name",
						field: "name",
						type: "string",
					},
					{
						title: "Items",
						field: "items.length",
						type: "numeric",
					},
				]}
				title="Playlists"
				data={model.playlists}/>
		</PageContainer>
	)
});

