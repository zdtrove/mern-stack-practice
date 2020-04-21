import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { loadUser, loadAllUsers } from '../../redux/actions/AuthActions';

const Home = (props) => {
	console.log(props.users);
	React.useEffect(() => {
		if (!props.isAuthenticated) {
			props.history.push('/login');
		} else {
			props.loadUser();
			props.loadAllUsers();
		}
		// eslint-disable-next-line
	}, [props.isAuthenticated, props.history]);
	return <Fragment>
		Home { props.user && props.user.userName }
	</Fragment>
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user,
	users: state.auth.users
});

export default connect(mapStateToProps, { loadUser, loadAllUsers })(Home);