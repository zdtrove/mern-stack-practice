import React from 'react';
import { isEmpty, isLength } from 'validator';
import { Container, TextField, Typography, Avatar, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LockOutlined } from '@material-ui/icons';
import { connect } from 'react-redux';
import { register, setError, clearError } from '../../redux/actions/AuthActions';
import { GetErrorMessage, GetErrorMessage2 } from '../../utils/validator';

const useStyles = makeStyles(theme => ({
	...theme.globalStyles.common,
	...theme.globalStyles.register
}));

const Register = (props) => {
	const classes = useStyles();
	React.useEffect(() => {
		if (props.isAuthenticated === true || localStorage.token) {
			props.history.push('/');
		} else props.clearError();
		// eslint-disable-next-line
	}, [props.isAuthenticated, props.history]);
	const [user, setUser] = React.useState({
		userName: '',
		email: '',
		password: '',
		passwordConfirm: ''
	});
	const { userName, email, password, passwordConfirm } = user;
	const handleChange = evt => {
		const { name, value } = evt.target;
		setUser({
			...user,
			[name]: value
		});
		let errs = { ...props.errors };
		if (!isEmpty(value)) delete errs[name];
		else errs[name] = `Please provide ${name} field`;
		if (name === 'userName' && !isEmpty(value)) {
			errs[name] = GetErrorMessage('Username', 'check_length', {min: 3, max: 24}, value);
		}
		if (name === 'email' && !isEmpty(value)) {
			errs[name] = GetErrorMessage('Email', 'check_email', null, value);
		}
		if (name === 'password' && !isEmpty(value)) {
			errs[name] = GetErrorMessage('Password', 'check_length', {min: 6, max: 32}, value);
		}
		if (name === 'passwordConfirm' && !isEmpty(value)) {
			errs[name] = GetErrorMessage('Password Confirm', 'check_length', {min: 6, max: 32}, value);
		}
		let errorTest = GetErrorMessage2(name, value, [
			['userName', 'check_length', {min: 3, max: 24}],
			['password', 'check_length', {min: 6, max: 32}],
			['passwordConfirm', 'check_length', {min: 6, max: 32}]
		]);
		console.log(errorTest);
		props.setError(errs);
	}
	const handleSubmit = evt => {
		evt.preventDefault();
		let errs = {};
		if (!isLength(password, {min: 6})) errs['password'] = `Please provide 6 character long password`;
		if (!isLength(password, {max: 32})) errs['password'] = `Please provide a password shorter than 32 characters`;
		if (password !== '' && password !== passwordConfirm) errs.passwordConfirm = 'Password confirmation does not match password';
		if (!isLength(passwordConfirm, {min: 6})) errs['passwordConfirm'] = `Please provide 6 character long passwordConfirm`;
		if (!isLength(passwordConfirm, {max: 32})) errs['passwordConfirm'] = `Please provide a passwordConfirm shorter than 32 characters`;
		for (const item in user) {
		  	if (isEmpty(user[item])) errs[item] = `Please provide ${item} field`;
		}
		if (Object.keys(errs).length > 0) {
			props.setError(errs);
		} else props.register({ userName, email, password, passwordConfirm });
	}
	const { errors, loading } = props;
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
					<TextField
						name="userName"
		          		label="Username"
		          		variant="outlined"
		          		value={userName}
		          		onChange={handleChange}
		          		helperText={errors && errors.userName ? errors.userName : ''}
						error={errors && errors.userName ? true : false} 
		        	/>
		        </div>
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
		        <div>
		        	<TextField
		        		name="passwordConfirm"
		          		label="Password Confirm"
		          		type="password"
		          		variant="outlined"
		          		value={passwordConfirm}
		          		onChange={handleChange}
		          		helperText={errors && errors.passwordConfirm ? errors.passwordConfirm : ''}
						error={errors && errors.passwordConfirm ? true : false} 
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