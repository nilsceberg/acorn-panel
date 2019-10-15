import * as React from "react";

import { makeStyles, withStyles, withTheme, ThemeProvider } from "@material-ui/styles";
import { ListSubheader, ListItem, ListItemIcon, ListItemText, Divider, Badge } from "@material-ui/core";
import {
	Dashboard as DashboardIcon,
	Settings as SettingsIcon,
	BarChart as BarChartIcon,
	PersonalVideo as PersonalVideoIcon,
	PlaylistPlay as PlaylistPlayIcon,
	Schedule as ScheduleIcon,
	Add as AddIcon,
	People as PeopleIcon,
} from "@material-ui/icons";

import { Model } from "../model/Model";
import { observer } from "mobx-react";
import { PageInfo, Pages } from "../model/Pages";

export interface MenuProps {
	model: Model;
}

interface MenuItemProps {
	model: Model;
	page: PageInfo;
	children: JSX.Element;
}

const MenuItem = observer((props: MenuItemProps) => {
	return (
		<ListItem onClick={() => { props.model.page = props.page }} selected={props.model.page.identifier === props.page.identifier} button>
			<ListItemIcon>
				{props.children}
			</ListItemIcon>
			<ListItemText primary={props.page.title} />
		</ListItem>
	);
});

export const Menu = (props: MenuProps) => {
	return (
		<div>
			<div>
				<ListSubheader inset>Manage</ListSubheader>
				<MenuItem model={props.model} page={Pages.Dashboard}><DashboardIcon/></MenuItem>
				<MenuItem model={props.model} page={Pages.Screens}><PersonalVideoIcon/></MenuItem>
				<MenuItem model={props.model} page={Pages.Playlists}><PlaylistPlayIcon/></MenuItem>
				<MenuItem model={props.model} page={Pages.Schedules}><ScheduleIcon/></MenuItem>
				<MenuItem model={props.model} page={Pages.New}>
					<Badge badgeContent={1} color="secondary">
						<AddIcon />
					</Badge>
				</MenuItem>
			</div>
			<Divider />
			<div>
				<ListSubheader inset>System</ListSubheader>
				<MenuItem model={props.model} page={Pages.Settings}><SettingsIcon/></MenuItem>
				<MenuItem model={props.model} page={Pages.Diagnostics}><BarChartIcon/></MenuItem>
			</div>
		</div>
	);
};