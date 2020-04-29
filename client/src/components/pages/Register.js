import React from 'react';
import {
	Container,
	TextField,
	Typography,
	Avatar,
	Button,
	CircularProgress,
	RadioGroup,
	Radio,
	FormGroup,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Checkbox
} from '@material-ui/core';
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
		phone: '',
		gender: '',
		location: '',
		money: 0,
		role: 'user',
		isPremium: false,
		ability: [],
		password: '',
		passwordConfirm: ''
	});
	const { userName, email, phone, location, money, role, isPremium, ability, password, passwordConfirm } = user;
	const rules = {
		userName: { name: 'Username', require: true, minLength: 3, maxLength: 24 },
		isPremium: { name: 'Premium', require: true },
		email: { name: 'Email', require: true, isEmail: true },
		phone: { name: 'Phone Number', require: true, isPhone: true, minLength: 10, maxLength: 12 },
		gender: { name: 'Gender', require: true },
		location: { name: 'Location', require: true, minLength: 6, maxLength: 255 },
		ability: { name: 'Ability', require: true },
		password: { name: 'Password', require: true, minLength: 6, maxLength: 32 },
		passwordConfirm: { name: 'Password Confirm', require: true, minLength: 6, maxLength: 32, match: 'password' }
	}
	const handleChange = evt => {
		const { name } = evt.target;
		const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
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
	const abilityList = ['doctor', 'nurse', 'developer'];
	const handleChangeCheckboxes = evt => {
		const { name, checked } = evt.target;
		if (checked) {
			ability.push(name);
		} else {
			let index = ability.indexOf(name);
			ability.splice(index, 1);
		}
		setUser({
			...user,
			ability
		});
		let errs = { ...errors };
		errs['ability'] = GetErrorMessageOnChange('ability', ability, rules);
		setError(errs);
	}
	console.log(user);
	console.log(errors);
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
					<FormControl required error={errors.isPremium ? true : false}>
						<FormGroup row>
							<FormControlLabel
								control={<Checkbox name="isPremium" color="primary" />}
								label="Is Premium?"
								value={isPremium}
								onChange={handleChange}
							/>
						</FormGroup>
						<FormHelperText>{errors.isPremium}</FormHelperText>
					</FormControl>
				</div>
				<div>
					<TextField name="email" label="Email" type="email" variant="outlined"
						value={email} onChange={handleChange}
						helperText={errors.email}
						error={errors.email ? true : false}
					/>
				</div>
				<div>
					<TextField name="phone" label="Phone Number" type="number" variant="outlined"
						value={phone} onChange={handleChange}
						helperText={errors.phone}
						error={errors.phone ? true : false}
					/>
				</div>
				<div>
					<FormControl component="fieldset" error={errors.gender ? true : false}>
						<RadioGroup onChange={handleChange} row aria-label="gender" name="gender">
							<FormControlLabel value="0" control={<Radio color="primary" />} label="Male" />
							<FormControlLabel value="1" control={<Radio color="primary" />} label="Female" />
						</RadioGroup>
						<FormHelperText>{errors.gender}</FormHelperText>
					</FormControl>
				</div>
				<div>
					<TextField name="location" label="Location" variant="outlined" multiline rows={4} rowsMax={8}
						value={location} onChange={handleChange}
						helperText={errors.location}
						error={errors.location ? true : false}
					/>
				</div>
				<div>
					<FormControl required error={errors.ability ? true : false}>
						<FormGroup row>
							{abilityList.map((item, index) => (
								<FormControlLabel
									key={index}
									control={<Checkbox name={item} color="primary" />}
									label={`${item.charAt(0).toUpperCase()}${item.slice(1)}`}
									value={item}
									onChange={handleChangeCheckboxes}
								/>
							))}
						</FormGroup>
						<FormHelperText>{errors.ability}</FormHelperText>
					</FormControl>
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