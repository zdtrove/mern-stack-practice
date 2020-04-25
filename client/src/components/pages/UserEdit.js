import React from 'react';
import {
    Modal,
    Card,
    CardContent,
    CardActions,
    TextField,
    Typography,
    Grid,
    Switch,
    Button,
    colors
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { updateUser, setError, clearError } from '../../redux/actions/AuthActions';
import { GetErrorMessageOnChange, GetErrorMessageOnSubmit } from '../../utils/validator';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        outline: 'none',
        boxShadow: theme.shadows[20],
        width: 700,
        maxHeight: '100%',
        overflowY: 'auto',
        maxWidth: '100%'
    },
    container: {
        marginTop: theme.spacing(3)
    },
    actions: {
        justifyContent: 'flex-end'
    },
    saveButton: {
        color: theme.palette.white,
        backgroundColor: colors.green[600],
        '&:hover': {
            backgroundColor: colors.green[900]
        }
    }
}));

const UserEdit = (props) => {
    React.useEffect(() => {
        if (Object.keys(props.userDetail).length > 0) {
            setUser(props.userDetail);
        }
    }, [props.userDetail]);
    const classes = useStyles();
    const { openModel, closeModel, updateUser, errors, setError, clearError } = props;
    const [user, setUser] = React.useState({
        userName: '',
        email: '',
        gender: '',
        role: '',
        location: ''
    });

    const handleClose = () => {
        closeModel();
        clearError();
        setUser(props.userDetail);
    }
    const rules = {
        userName: { name: 'Username', require: true, minLength: 3, maxLength: 24 },
        email: { name: 'Email', require: true, isEmail: true }
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
        } else {
            updateUser(user);
            handleClose();
        }
    }
    return (
        <Modal open={openModel}>
            <Card className={classes.root}>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <Typography align="center" gutterBottom variant="h6">
                            Edit Customer
                        </Typography>
                        <Grid className={classes.container} container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <TextField fullWidth label="Username" name="userName" variant="outlined"
                                    value={user.userName} onChange={handleChange}
                                    helperText={errors.userName}
                                    error={errors.userName ? true : false}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField fullWidth label="Email address" name="email" variant="outlined"
                                    value={user.email} onChange={handleChange}
                                    helperText={errors.email}
                                    error={errors.email ? true : false}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField fullWidth label="Gender" name="gender" variant="outlined"
                                    value={user.gender} onChange={handleChange}
                                    helperText={errors.gender}
                                    error={errors.gender ? true : false}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField fullWidth label="Roles" name="role" variant="outlined"
                                    value={user.role} onChange={handleChange}
                                    helperText={errors.role}
                                    error={errors.role ? true : false}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField fullWidth label="Location" name="location" variant="outlined"
                                    value={user.location} onChange={handleChange}
                                    helperText={errors.location}
                                    error={errors.location ? true : false}
                                />
                            </Grid>
                            <Grid item />
                            <Grid item md={6} xs={12}>
                                <Typography variant="h5">Email Verified</Typography>
                                <Typography variant="body2">
                                    Disabling this will automatically send the user a verification
                                    email
                                </Typography>
                                <Switch color="secondary" edge="start" name="verified"/>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Typography variant="h5">Discounted Prices</Typography>
                                <Typography variant="body2">
                                    This will give the user discountedprices for all products
                                </Typography>
                                <Switch color="secondary" edge="start" name="discountedPrices"/>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Button variant="contained" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="contained" className={classes.saveButton}>
                            Save
                        </Button>
                    </CardActions>
                </form>
            </Card>
        </Modal>
    )
}

const mapStateToProps = state => ({
    errors: state.auth.errors
});

export default connect(mapStateToProps, { updateUser, setError, clearError })(UserEdit);
