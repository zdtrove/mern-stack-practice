import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Notfound from './components/pages/Notfound';
import Navbar from './components/layouts/Navbar';
import themeFile from './utils/theme';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import store from './redux/store';
// import axios from 'axios';

const theme = createMuiTheme(themeFile);
// axios.defaults.baseURL = 'http://localhost:5000';


function App() {
    return (
        <MuiThemeProvider theme={theme}>
        	<Provider store={store}>
        		<Router>
		        	<Navbar />
		        	<Switch>
		        		<Route exact path='/' component={Home} />
		        		<Route exact path='/register' component={Register} />
		        		<Route exact path='/login' component={Login} />
		        		<Route component={Notfound} />
		        	</Switch>
		        </Router>
        	</Provider>
        </MuiThemeProvider>
    );
}

export default App;
