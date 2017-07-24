import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import CircularProgress from 'material-ui/CircularProgress';
import { Route, Switch } from 'react-router-dom';
import {withCookies}  from 'react-cookie';
import axios from 'axios';
import PrivateRoute from '../components/AuthenticationContainer';


import NotFoundPage from './NotFoundPage';
import LoginPage from './LoginPage';
import FormPage from './FormPage';
import TablePage from './TablePage';
import Dashboard from './DashboardPage';
import Header from '../components/Header';
import LeftDrawer from '../components/LeftDrawer';
import ThemeDefault from '../theme-default';
import Data from '../data';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false,
      userIsAuthenticated: false,
      isLoading: false
    };

    this.USER_INFO_ENDPOINT = '/api/user/?v=1.0';
    this.USER_SIGN_OUT_ENDPOINT = '/api/auth/logout/?v=1.0';

    this.handleAuthenticationUpdate = this.handleAuthenticationUpdate.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentWillMount() {
    this.setState({isLoading: true});
    axios(this.USER_INFO_ENDPOINT).then( response => {
      const userIsLoggedIn = response.data.uid;
      if (userIsLoggedIn) this.handleAuthenticationUpdate();
      this.setState({isLoading: false});
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }

  handleAuthenticationUpdate() {
    this.setState({userIsAuthenticated:true});
  }

  handleSignOut(){
    const { cookies } = this.props;
    const csrftoken = cookies.get('csrftoken');

    // No payload necessary for signout, so we pass in an empty {}
    axios.post(this.USER_SIGN_OUT_ENDPOINT, {}, { headers: {'X-CSRFToken': csrftoken }}).then( response => {
      this.setState({userIsAuthenticated:false});      
      console.log("RES", response);
    }).catch( res => console.log("RES", res));
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  render() {
    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      },
      loader: {
        textAlign: 'center',
        marginTop: '25%'
      }
    };
    
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
            <Header styles={styles.header}
                  handleSignOut={this.handleSignOut}
                  handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>

            <LeftDrawer navDrawerOpen={navDrawerOpen}
                        menus={Data.menus}
                        username="User Admin"/>

            <div style={styles.container}>
            { (this.state.isLoading && 
              <div style={styles.loader}>
                <CircularProgress  size={200} thickness={15}/>
              </div>) 
              ||
              <Switch>
                <Route path="/login" render={routeProps => <LoginPage {...routeProps} handleAuthenticationUpdate={this.handleAuthenticationUpdate}/>}/>
                <PrivateRoute exact path="/" component={Dashboard} isAuthenticated={this.state.userIsAuthenticated} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} isAuthenticated={this.state.userIsAuthenticated} />
                <PrivateRoute path="/form" component={FormPage} isAuthenticated={this.state.userIsAuthenticated} />
                <PrivateRoute path="/table" component={TablePage} isAuthenticated={this.state.userIsAuthenticated} />
                <PrivateRoute path="*" component={NotFoundPage} isAuthenticated={this.state.userIsAuthenticated} />
              </Switch>
            }

            </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number
};

export default withCookies(withWidth()(App));
