import React from 'react';
import {
    Modal,
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    colors
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deleteUser } from '../../redux/actions/AuthActions';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        outline: 'none',
        boxShadow: theme.shadows[20],
        width: 350,
        maxHeight: '100%',
        overflowY: 'auto',
        maxWidth: '100%'
    },
    container: {
        marginTop: theme.spacing(3)
    },
    actions: {
        justifyContent: 'center'
    },
    saveButton: {
        color: theme.palette.white,
        backgroundColor: colors.green[600],
        '&:hover': {
            backgroundColor: colors.green[900]
        }
    }
}));

const ConfirmDelete = (props) => {
    const { openModel, closeModel, idDelete, deleteUser } = props;
    const handleDelete = () => {
        deleteUser(idDelete);
        if (props.setDeleteSuccess) {
            props.setDeleteSuccess(true);
        }
        closeModel();
    }
    const classes = useStyles();
    return <Modal open={openModel}>
        <Card className={classes.root}>
            <CardContent className={classes.actions}>
                <Typography>Are you sure to delete?</Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <Button variant="contained" size="small" onClick={() => closeModel()}>
                    Cancel
                </Button>
                <Button variant="contained" size="small" color="secondary" onClick={handleDelete}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    </Modal>
}

export default connect(null, { deleteUser })(ConfirmDelete);
