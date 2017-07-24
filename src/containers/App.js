import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import { Route, Switch } from 'react-router-dom';
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
      isAuthenticated: false
    };

    this.handleAuthenticationUpdate = this.handleAuthenticationUpdate.bind(this);
    
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }

  handleAuthenticationUpdate(){
    this.setState({isAuthenticated:true});
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
      }
    };
    
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
            <Header styles={styles.header}
                  handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>

            <LeftDrawer navDrawerOpen={navDrawerOpen}
                        menus={Data.menus}
                        username="User Admin"/>

            <div style={styles.container}>
              <Switch>
                <Route path="/login" render={routeProps => <LoginPage {...routeProps} handleAuthenticationUpdate={this.handleAuthenticationUpdate}/>}/>
                {
                  // We should abstract this switch out into it's own component
                }
                <PrivateRoute exact path="/" component={Dashboard} isAuthenticated={this.state.isAuthenticated} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} isAuthenticated={this.state.isAuthenticated} />
                <PrivateRoute path="/form" component={FormPage} isAuthenticated={this.state.isAuthenticated} />
                <PrivateRoute path="/table" component={TablePage} isAuthenticated={this.state.isAuthenticated} />
                <PrivateRoute path="*" component={NotFoundPage} isAuthenticated={this.state.isAuthenticated} />
            </Switch>
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

export default withWidth()(App);
