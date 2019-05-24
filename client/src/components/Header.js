import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MapIcon from "@material-ui/icons/Map";
import Typography from "@material-ui/core/Typography";
import { unstable_useMediaQuery as useMedeaQuery } from "@material-ui/core/useMediaQuery";

import Context from "../context";
import Signout from "../components/Auth/Signout";

const Header = ({ classes }) => {
	const { state } = useContext(Context);
	const { currentUser } = state;
	const mobileSize = useMedeaQuery("(max-width:650px)");

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					{/* title logo */}
					<div className={classes.grow}>
						<MapIcon className={classes.icon} />
						<Typography
							component="h1"
							variant="h4"
							color="inherit"
							noWrap
							className={mobileSize ? classes.mobile : ""}>
							Geopins
						</Typography>
					</div>
					{/* CurrentUser info */}
					{currentUser && (
						<div className={classes.grow}>
							<img
								className={classes.picture}
								alt={currentUser.name}
								src={currentUser.picture}
							/>
							<Typography
								variant="h5"
								color="inherit"
								noWrap
								className={mobileSize ? classes.mobile : ""}>
								>{currentUser.name}
							</Typography>
						</div>
					)}

					{/* signout button */}
					<Signout />
				</Toolbar>
			</AppBar>
		</div>
	);
};

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	grow: {
		flexGrow: 1,
		display: "flex",
		alignItems: "center"
	},
	icon: {
		marginRight: theme.spacing.unit,
		color: "green",
		fontSize: 45
	},
	mobile: {
		display: "none"
	},
	picture: {
		height: "50px",
		borderRadius: "90%",
		marginRight: theme.spacing.unit * 2
	}
});

export default withStyles(styles)(Header);
