import React from 'react';
import { Container, TextField, Typography, Avatar, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LockOutlined } from '@material-ui/icons';
import { connect } from 'react-redux';
import { register, setError, clearError } from '../../redux/actions/AuthActions';
import { GetErrorMessageOnChange, GetErrorMessageOnSubmit } from '../../utils/validator';

const useStyles = makeStyles(theme => ({
	...theme.globalStyles.common,
	...theme.globalStyles.register
}));

const Register = (props) => {
	const { errors, loading, setError, register, clearError, isAuthenticated, history } = props;
	const classes = useStyles();
	React.useEffect(() => {
		if (isAuthenticated === true || localStorage.token) {
			history.push('/');
		} else clearError();
		// eslint-disable-next-line
	}, [isAuthenticated, history]);
	const [user, setUser] = React.useState({
		userName: '',
		email: '',
		password: '',
		passwordConfirm: ''
	});
	const { userName, email, password, passwordConfirm } = user;
	const rules = {
	    userName: { name: 'Username', require: true, minLength: 3, maxLength: 24 },
	    email: { name: 'Email', require: true, isEmail: true },
	    password: { name: 'Password', require: true, minLength: 6, maxLength: 32 },
	    passwordConfirm: { name: 'Password Confirm', require: true, minLength: 6, maxLength: 32, match: 'password' }
	}
	const handleChange = evt => {
		const { name, value } = evt.target;
		setUser({
			...user,
			[name]: value
		});
		let errs = { ...errors };
		errs[name] = GetErrorMessageOnChange(name, value, rules);
		setError(errs);
	}
	const handleSubmit = evt => {
		evt.preventDefault();
		let errs = GetErrorMessageOnSubmit(user, rules);
		if (Object.keys(errs).length > 0) {
			setError(errs);
		} else register(user);
	}
	return <Container component="main" maxWidth="xs" className={classes.root}>
		<div className={classes.paper}>
			<Avatar className={classes.avatar}>
				<LockOutlined />
			</Avatar>
			<Typography component="h1" variant="h5">
	          	Register
	        </Typography>
			<form onSubmit={handleSubmit} className={classes.form}>
				<div>
					<TextField name="userName" label="Username" variant="outlined"
		          		value={userName} onChange={handleChange}
		          		helperText={errors.userName}
						error={errors.userName ? true : false} 
		        	/>
		        </div>
		        <div>
					<TextField name="email" label="Email" type="email" variant="outlined"
		          		value={email} onChange={handleChange}
		          		helperText={errors.email}
						error={errors.email ? true : false} 
		        	/>
		        </div>
		        <div>
					<TextField name="password" label="Password" type="password" variant="outlined"
		          		value={password} onChange={handleChange}
		          		helperText={errors.password}
						error={errors.password ? true : false} 
		        	/>
		        </div>
		        <div>
		        	<TextField name="passwordConfirm" label="Password Confirm" type="password"
		          		variant="outlined" value={passwordConfirm} onChange={handleChange}
		          		helperText={errors.passwordConfirm}
						error={errors.passwordConfirm ? true : false} 
		        	/>
		        </div>
		        <div className={classes.wrappSubmit}>
			        <Button type="submit" color="primary" variant="contained" fullWidth disabled={loading} align="center">
						Register
						{loading && <CircularProgress size={30} className={classes.progress} />}
					</Button>
			    </div>
			</form>
		</div>
	</Container>
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	errors: state.auth.errors,
	loading: state.auth.loading
});

export default connect(mapStateToProps, { register, setError, clearError })(Register);