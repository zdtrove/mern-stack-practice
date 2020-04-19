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
import { login, setError, clearError } from '../../redux/actions/AuthActions';
import { connect } from 'react-redux';
import { isEmpty, isEmail } from 'validator';

const useStyles = makeStyles((theme) => ({
  	root: {
	    '& .MuiTextField-root': {
	      	margin: theme.spacing(1),
	      	width: '50ch'
	    },
	    '& .MuiFormHelperText-contained': {
	    	marginLeft: 0
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
	},
	wrapError: {
		textAlign: 'center'
	},
	errors: {
		color: 'red'
	}
}));

const Login = (props) => {
	React.useEffect(() => {
		if (props.isAuthenticated === true || localStorage.token) {
			props.history.push('/');
		} else props.clearError();
		// eslint-disable-next-line
	}, [props.history, props.isAuthenticated]);
	const [user, setUser] = React.useState({
		email: '',
		password: ''
	});
	const { email, password } = user;
	const handleChange = evt => {
		const { name, value } = evt.target;
		setUser({
			...user,
			[name]: value
		});
		let errs = { ...props.errors };
		if (!isEmpty(value)) delete errs[name];
		else errs[name] = `Please provide ${name} field`;
		if (name === 'email' && !isEmpty(value)) {
			if (!isEmail(value)) errs[name] = "Invalid email address";
		}
		props.setError(errs);
	}
	const handleSubmit = evt => {
		evt.preventDefault();
		let errs = {};
		if (!isEmail(email)) errs['email'] = "Invalid email address";
		for (const item in user) {
			if (isEmpty(user[item])) errs[item] = `Please provide ${item} field`;
		}
		if (Object.keys(errs).length > 0) {
			props.setError(errs);
		} else props.login({ email, password });
	}
	const classes = useStyles();
	const { errors } = props;
	return <Container component="main" maxWidth="xs" className={classes.root}>
		<div className={classes.paper}>
			<Avatar className={classes.avatar}>
				<LockOutlined />
			</Avatar>
			<Typography component="h1" variant="h5">
	          	Login
	        </Typography>
			<form onSubmit={handleSubmit} className={classes.form}>
		        <div>
					<TextField
						name="email"
		          		label="Email"
		          		type="email"
		          		variant="outlined"
		          		value={email}
		          		onChange={handleChange}
		          		helperText={errors && errors.email ? errors.email : ''}
		          		error={errors && errors.email ? true : false}
		        	/>
		        </div>
		        <div>
					<TextField
						name="password"
		          		label="Password"
		          		type="password"
		          		variant="outlined"
		          		value={password}
		          		onChange={handleChange}
		          		helperText={errors && errors.password ? errors.password : ''}
		          		error={errors && errors.password ? true : false}
		        	/>
		        </div>
		        <div className={classes.wrapError}>
		        	<Typography className={classes.errors}>{errors && errors.msg ? errors.msg : ''}</Typography>
		        </div>
		        <div className={classes.wrappSubmit}>
			        <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
			    </div>
			</form>
		</div>
	</Container>
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	errors: state.auth.errors
});

export default connect(mapStateToProps, { login, setError, clearError })(Login);