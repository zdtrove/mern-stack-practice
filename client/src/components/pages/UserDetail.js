import React from 'react';
import {
    Container,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getUser } from '../../redux/actions/AuthActions';
import UserEdit from './UserEdit';

const UserDetail = (props) => {
    React.useEffect(() => {
        props.getUser(props.match.params.userId);
        // eslint-disable-next-line
    }, [props.getUser]);
    const useStyles = makeStyles(theme => ({
        container: {
            padding: theme.spacing(15),
        },
        actions: {
            justifyContent: 'flex-end'
        }
    }));
    const classes = useStyles();
    const userDetail = props.userDetail ? props.userDetail : {};
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Container component="main" maxWidth="md" className={classes.container}>
            <Card>
                <CardHeader title="User Detail" />
                <Divider />
                <CardContent>
                    <Table>
                        {userDetail ? (
                            <TableBody>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell>
                                        {userDetail.userName}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell>
                                        {userDetail.email}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>{userDetail.gender === 0 ? 'Male' : 'Female'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Roles</TableCell>
                                    <TableCell>{userDetail.role}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Location</TableCell>
                                    <TableCell>{userDetail.location}</TableCell>
                                </TableRow>
                            </TableBody>
                        ) : (
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        No User
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            )
                        }
                    </Table>
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button size="small" variant="contained" color="primary" onClick={() => handleOpen()}>Edit</Button>
                    <Button size="small" variant="contained" color="secondary">Delete</Button>
                </CardActions>
                <UserEdit handleCloseProps={handleClose} open={open} userDetail={userDetail} />
            </Card>
        </Container>
    )
}

const mapStateToProps = state => ({
    userDetail: state.auth.userDetail
});

export default connect(mapStateToProps, { getUser })(UserDetail);
