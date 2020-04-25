import React from 'react';
import { 
	Container, 
	TextField, 
	Typography, 
	Avatar, 
	Button,
	CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LockOutlined } from '@material-ui/icons';
import { login, setError, clearError } from '../../redux/actions/AuthActions';
import { connect } from 'react-redux';
import { GetErrorMessageOnChange, GetErrorMessageOnSubmit } from '../../utils/validator';

const useStyles = makeStyles((theme) => ({
  	...theme.globalStyles.common,
  	...theme.globalStyles.login
}));

const Login = (props) => {
	const { errors, loading, login, clearError, isAuthenticated, history } = props;
	React.useEffect(() => {
		if (isAuthenticated === true || localStorage.token) {
			history.push('/');
		} else clearError();
		// eslint-disable-next-line
	}, [history, isAuthenticated]);
	const [user, setUser] = React.useState({
		email: '',
		password: ''
	});
	const { email, password } = user;
	const rules = {
		email: { name: 'Email', require: true, isEmail: true },
		password: { name: 'Password', require: true, minLength: 6, maxLength: 32 }
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
		} else login({ email, password });
	}
	const classes = useStyles();
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
					<TextField name="email" label="Email" type="email" variant="outlined"
		          		value={email} onChange={handleChange}
		          		helperText={errors.email}
		          		error={errors.email ? true : false}
		        	/>
		        </div>
		        <div>
					<TextField name="password" label="Password" type="password" 
						variant="outlined" value={password} onChange={handleChange}
		          		helperText={errors.password}
		          		error={errors.password ? true : false}
		        	/>
		        </div>
		        <div className={classes.wrapError}>
		        	<Typography className={classes.errors}>{errors && errors.msg ? errors.msg : ''}</Typography>
		        </div>
		        <div className={classes.wrappSubmit}>
			        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
						Login
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

export default connect(mapStateToProps, { login, setError, clearError })(Login);