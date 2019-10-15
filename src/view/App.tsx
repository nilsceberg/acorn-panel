import * as React from "react";
import { observer } from "mobx-react";
import { Model } from "../model/Model";

import Button from "@material-ui/core/Button";
import { CssBaseline } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import * as PropTypes from "prop-types";

interface AppProps {
	model: Model;
	classes: Classes;
}

const styles = (theme: any) => ({
	root: {
		display: "flex",
		backgroundColor: "green",
	}
})

const useStyles = makeStyles(styles);

export const App = withStyles(styles)(observer(
	class extends React.Component<AppProps> {
		render() {
			return (
				<div className={this.props.classes.root}>
					<CssBaseline/>
					{this.props.model.systemMessage}
					<Button onClick={() => this.props.model.systemMessage = "CLICKED!" } variant="contained" color="primary">Log In</Button>
				</div>
			);
		}
	}
));
