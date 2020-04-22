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
import { updateUser } from '../../redux/actions/AuthActions';

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
    const { open, handleCloseProps, updateUser } = props;
    const [user, setUser] = React.useState({
        userName: '',
        email: '',
        gender: '',
        role: '',
        location: ''
    });

    const handleClose = () => {
        handleCloseProps();
        setUser(props.userDetail);
    }
    
    const handleChange = evt => {
        setUser({
            ...user,
            [evt.target.name]: evt.target.value
        });
    }
    const onSubmit = evt => {
        evt.preventDefault();
        updateUser(user);
        handleClose();
    }
    return (
        <Modal open={open} onClose={handleClose}>
            <Card className={classes.root}>
                <form onSubmit={onSubmit}>
                    <CardContent>
                        <Typography align="center" gutterBottom variant="h6">
                            Edit Customer
                        </Typography>
                        <Grid className={classes.container} container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <TextField fullWidth label="Username" name="userName" value={user.userName} onChange={handleChange} variant="outlined"/>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField fullWidth label="Email address" name="email" value={user.email} onChange={handleChange} variant="outlined"/>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField fullWidth label="Gender" name="gender" value={user.gender} onChange={handleChange} variant="outlined"/>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField fullWidth label="Roles" name="role" value={user.role} onChange={handleChange} variant="outlined"/>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField fullWidth label="Location" name="location" value={user.location} onChange={handleChange} variant="outlined"/>
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

export default connect(null, { updateUser })(UserEdit);
