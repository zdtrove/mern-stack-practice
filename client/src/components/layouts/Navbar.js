import React, { Fragment } from 'react';
import { 
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
	Tooltip
} from '@material-ui/core';
import { Menu, AccountCircle, ExitToApp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/AuthActions';

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

const Navbar = (props) => {
	const classes = useStyles();
	return <Fragment>
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton to='/' component={Link} className={classes.menuButton}>
						<Menu />
					</IconButton>
					<Typography className={classes.title}>Home</Typography>
					{
						props.isAuthenticated ? (
							<Fragment>
								<Typography>Hello User</Typography>
								<IconButton color="inherit">
					                <AccountCircle />
					            </IconButton>
					            <Tooltip title="Logout" placement="bottom">
					            	<IconButton onClick={() => props.logout()} color="inherit">
					            		<ExitToApp />
					            	</IconButton>
					            </Tooltip>
					        </Fragment>
						) : (
							<Fragment>
								<Button color="inherit" component={Link} to='/login'>Login</Button>
								<Button color="inherit" component={Link} to='/register'>Register</Button>
							</Fragment>
						)
					}
				</Toolbar>
			</AppBar>
		</div>
	</Fragment>
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);