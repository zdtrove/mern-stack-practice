import React from 'react';
import { connect } from 'react-redux';
import { loadAuth, getUsers } from '../../redux/actions/AuthActions';
import {
    Container,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Paper,
    IconButton,
    Toolbar,
    Typography,
    Button
} from '@material-ui/core';
import {
    FirstPage as FirstPageIcon,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    LastPage as LastPageIcon,
    DeleteForever as DeleteForeverIcon
} from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const Home = (props) => {
    React.useEffect(() => {
        if (!props.isAuthenticated) {
            props.history.push('/login');
        } else {
            props.loadAuth();
            props.getUsers();
        }
        // eslint-disable-next-line
    }, [props.isAuthenticated, props.history]);

    const useStyles1 = makeStyles((theme) => ({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }));

    function TablePaginationActions(props) {
        const classes = useStyles1();
        const theme = useTheme();
        const { count, page, rowsPerPage, onChangePage } = props;
        const handleFirstPageButtonClick = (event) => {
            onChangePage(event, 0);
        };
        const handleBackButtonClick = (event) => {
            onChangePage(event, page - 1);
        };
        const handleNextButtonClick = (event) => {
            onChangePage(event, page + 1);
        };
        const handleLastPageButtonClick = (event) => {
            onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    }

    const useStyles2 = makeStyles(theme => ({
        table: {
            minWidth: 500,
        },
        container: {
            padding: theme.spacing(15),
        },
        title: {
            flex: '1 1 100%',
        }
    }));
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const TotalUser = props.users ? props.users.length : 0;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, TotalUser - page * rowsPerPage);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const users = props.users ? props.users : [];
    return <Container component="main" maxWidth="xl" className={classes.container}>
        {
            users.length > 0 ? (
                <Paper>
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                            User List
                        </Typography>
                    </Toolbar>
                    <TableContainer style={{ maxHeight: 470 }}>
                        <Table className={classes.table} stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Username</TableCell>
                                    <TableCell align="center">Gender</TableCell>
                                    <TableCell align="center">Roles</TableCell>
                                    <TableCell align="center">Location</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : users
                                ).map((row) => (
                                    <TableRow key={row.userName}>
                                        <TableCell align="center">{row.userName}</TableCell>
                                        <TableCell align="center">{row.gender === 0 ? 'Male' : 'Female'}</TableCell>
                                        <TableCell align="center">{row.role}</TableCell>
                                        <TableCell align="center">{row.location}</TableCell>
                                        <TableCell align="center">
                                            <Button component={Link} to={`/user/${row._id}`} color="primary" size="small" variant="contained">Detail</Button>
                                            {' '}<IconButton><DeleteForeverIcon color="secondary" /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                        }}
                        component="div"
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                </Paper>
            ) : (
                    <p>No Users</p>
                )
        }
    </Container>
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    users: state.auth.users
});

export default connect(mapStateToProps, { loadAuth, getUsers })(Home);