import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const Home = (props) => {
	React.useEffect(() => {
		if (!props.isAuthenticated) {
			props.history.push('/login');
		}
	}, [props.isAuthenticated, props.history]);
	return <Fragment>
		Home
	</Fragment>
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);