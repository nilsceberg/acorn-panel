import * as React from "react";
import { observer } from "mobx-react";
import { Model } from "../model/Model";

import Button from "@material-ui/core/Button";
import { CssBaseline, Theme, Drawer, AppBar, Typography, Toolbar, Divider, createMuiTheme, ListSubheader, ListItem, ListItemText, ListItemIcon, Badge } from "@material-ui/core";
import { makeStyles, withStyles, withTheme, ThemeProvider } from "@material-ui/styles";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";

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
import { relative } from "path";

interface AppProps {
	model: Model;
	classes?: Classes;
}

const styles = (theme: Theme) => {console.log(theme);return({
	root: {
		display: "flex",
	},
	drawerPaper: {
		position: "relative",
		width: 240,
		height: "100vh",
	},
	appBar: {
		marginLeft: 240,
		width: "calc(100% - 240px)",
		zIndex: theme.zIndex.drawer + 1,
	},
	title: {
	},
	logoBar: {
		height: theme.mixins.toolbar.minHeight, // removing this also looks fairly good
		...theme.mixins.toolbar,
	},
	logoImage: {
		height: "60%",
		marginLeft: -6,
		marginRight: 14,
		transform: "rotate(-20deg)",
	},
	main: {
		
	}
})}

const App = withStyles(styles)(observer(
	class extends React.Component<AppProps> {
		render() {
			const { classes } = this.props;
			return (
				<div className={classes.root}>
					<CssBaseline/>
					<AppBar position="absolute" className={classes.appBar}>
						<Toolbar>
							<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
								Control Panel
							</Typography>
						</Toolbar>
					</AppBar>
					<Drawer variant="permanent" classes={{ paper: classes.drawerPaper }} open={true}>
						<Toolbar className={classes.logoBar}>
							<img className={classes.logoImage} src="acorn.svg"/>
							<Typography component="h1" variant="h5" color="inherit" noWrap className={classes.title}>
								ACORN
							</Typography>
						</Toolbar>
						<Divider/>
						<div>
							<ListSubheader inset>Manage</ListSubheader>
							<ListItem selected button>
								<ListItemIcon>
									<DashboardIcon/>
								</ListItemIcon>
								<ListItemText primary="Dashboard" />
							</ListItem>
							<ListItem button>
								<ListItemIcon>
									<PersonalVideoIcon/>
								</ListItemIcon>
								<ListItemText primary="Screens" />
							</ListItem>
							<ListItem button>
								<ListItemIcon>
									<PlaylistPlayIcon/>
								</ListItemIcon>
								<ListItemText primary="Playlists" />
							</ListItem>
							<ListItem button>
								<ListItemIcon>
									<ScheduleIcon/>
								</ListItemIcon>
								<ListItemText primary="Schedules" />
							</ListItem>
							<ListItem button>
								<ListItemIcon>
									<Badge badgeContent={1} color="secondary">
										<AddIcon/>
									</Badge>
								</ListItemIcon>
								<ListItemText primary="New" />
							</ListItem>
						</div>
						<Divider/>
						<div>
							<ListSubheader inset>System</ListSubheader>
							<ListItem button>
								<ListItemIcon>
									<SettingsIcon/>
								</ListItemIcon>
								<ListItemText primary="Settings" />
							</ListItem>
							<ListItem button>
								<ListItemIcon>
									<BarChartIcon/>
								</ListItemIcon>
								<ListItemText primary="Diagnostics" />
							</ListItem>
						</div>
					</Drawer>
					<main className={classes.main}>
						{this.props.model.systemMessage}
						<Button onClick={() => this.props.model.systemMessage = "CLICKED!" } variant="contained" color="primary">Log In</Button>
					</main>
				</div>
			);
		}
	}
));

export const ThemedApp = (props: AppProps) => {
	const theme = createMuiTheme();
	return (
		<ThemeProvider theme={theme}>
			<App {...props}/>
		</ThemeProvider>
	);
}
