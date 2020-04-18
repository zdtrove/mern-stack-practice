import React from 'react';
import { 
	Container, 
	TextField, 
	Typography, 
	Avatar, 
	Button 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LockOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  	root: {
	    '& .MuiTextField-root': {
	      	margin: theme.spacing(1),
	      	width: '50ch'
	    }
  	},
  	paper: {
	    marginTop: theme.spacing(5),
	    display: 'flex',
	    flexDirection: 'column',
	    alignItems: 'center'
	},
	form : {
		marginTop: theme.spacing(3)
	},
	avatar: {
	    margin: theme.spacing(1),
	    backgroundColor: theme.palette.secondary.main,
	},
	wrappSubmit: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		margin: '8px'
	}
}));

const Login = () => {
	const classes = useStyles();
	return <Container component="main" maxWidth="xs" className={classes.root}>
		<div className={classes.paper}>
			<Avatar className={classes.avatar}>
				<LockOutlined />
			</Avatar>
			<Typography component="h1" variant="h5">
	          	Login
	        </Typography>
			<form className={classes.form}>
		        <div>
					<TextField
		          		label="Email"
		          		type="email"
		          		variant="outlined"
		        	/>
		        </div>
		        <div>
					<TextField
		          		label="Password"
		          		type="password"
		          		variant="outlined"
		        	/>
		        </div>
		        <div className={classes.wrappSubmit}>
			        <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
			    </div>
			</form>
		</div>
	</Container>
}

export default Login;