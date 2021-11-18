import * as React from "react";
import { observer } from "mobx-react";
import { Model } from "../model/Model";
import { Menu } from "./Menu";

import { Refresh as RefreshIcon } from "@material-ui/icons";
import { CssBaseline, Theme, Drawer, AppBar, Typography, Toolbar, Divider, createMuiTheme, ListSubheader, ListItem, ListItemText, ListItemIcon, Badge, IconButton } from "@material-ui/core";
import { makeStyles, withStyles, withTheme, ThemeProvider } from "@material-ui/styles";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import { Dashboard } from "./pages/Dashboard";
import { New } from "./pages/New";
import { NewController } from "../controllers/NewController";
import { Screens } from "./pages/Screens";
import { ScreensController } from "../controllers/ScreensController";
import { PlaylistsController } from "../controllers/PlaylistsController";
import { Playlists } from "./pages/Playlists";
import { Schedules } from "./pages/Schedules";
import { SchedulesController } from "../controllers/SchedulesController";

interface AppProps {
	model: Model;
	classes?: Classes;
}

const drawerWidth = 250;

const styles = (theme: Theme) => ({
	root: {
		display: "flex",
	},
	drawerPaper: {
		position: "relative",
		width: drawerWidth,
	},
	appBar: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
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
		height: "100vh",
		overflow: "auto",
		flexGrow: 1,
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		marginLeft: theme.spacing(5),
		marginRight: theme.spacing(5),
		marginTop: theme.spacing(4),
	}
});

const App = withStyles(styles as any)(observer(
	class extends React.Component<AppProps> {
		private newController: NewController;
		private screensController: ScreensController;
		private playlistsController: PlaylistsController;
		private schedulesController: SchedulesController;
		
		constructor(props: AppProps) {
			super(props);
			this.newController = new NewController(props.model);
			this.screensController = new ScreensController(props.model);
			this.playlistsController = new PlaylistsController(props.model);
			this.schedulesController = new SchedulesController(props.model);
		}

		componentWillUnmount() {
			this.newController.dispose();
			this.screensController.dispose();
			this.playlistsController.dispose();
			this.playlistsController.dispose();
		}

		render() {
			const { classes, model } = this.props;
			return (
				<div className={classes.root}>
					<CssBaseline/>
					<AppBar position="absolute" className={classes.appBar}>
						<Toolbar>
							<IconButton>
								<RefreshIcon color="inherit"/>
							</IconButton>
							<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
								{model.page.title}
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
						<Menu model={this.props.model}/>
					</Drawer>
					<main className={classes.main}>
						<div className={classes.appBarSpacer}/>
						<div className={classes.content}>
							<Dashboard model={model}/>
							<New model={model}/>
							<Screens controller={this.screensController} model={model}/>
							<Playlists controller={this.playlistsController} model={model}/>
							<Schedules controller={this.schedulesController} model={model}/>
						</div>
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
