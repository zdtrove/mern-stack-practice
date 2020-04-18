import React, { Fragment } from 'react';
import { 
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	}
}));

const Navbar = () => {
	const classes = useStyles();
	return <Fragment>
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton to='/' component={Link} className={classes.menuButton}>
						<Menu />
					</IconButton>
					<Typography className={classes.title}>Home</Typography>
					<Button color="inherit" component={Link} to='/login'>Login</Button>
					<Button color="inherit" component={Link} to='/register'>Register</Button>
				</Toolbar>
			</AppBar>
		</div>
	</Fragment>
}

export default Navbar;