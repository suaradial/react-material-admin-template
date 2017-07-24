import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import {withCookies}  from 'react-cookie';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import {grey500, white} from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';
import ThemeDefault from '../theme-default';

const styles = {
    loginContainer: {
      minWidth: 320,
      maxWidth: 400,
      height: 'auto',
      position: 'absolute',
      top: '20%',
      left: 0,
      right: 0,
      margin: 'auto'
    },
    paper: {
      padding: 20,
      overflow: 'auto'
    },
    buttonsDiv: {
      textAlign: 'center',
      padding: 10
    },
    flatButton: {
      color: grey500
    },
    checkRemember: {
      style: {
        float: 'left',
        maxWidth: 180,
        paddingTop: 5
      },
      labelStyle: {
        color: grey500
      },
      iconStyle: {
        color: grey500,
        borderColor: grey500,
        fill: grey500
      }
    },
    loginBtn: {
      float: 'right'
    },
    btn: {
      background: '#4f81e9',
      color: white,
      padding: 7,
      borderRadius: 2,
      margin: 2,
      fontSize: 13
    },
    btnFacebook: {
      background: '#4f81e9'
    },
    btnGoogle: {
      background: '#e14441'
    },
    btnSpan: {
      marginLeft: 5
    },
  };


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      user: {
        email: '',
        password: ''
      }
    };
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeUserCredentials = this.changeUserCredentials.bind(this);
  }

  handleChange() {
    console.log(this.props);
    this.props.handleAuthenticationUpdate();
  }

  login() {
    // need to prevent default so that React doesn't run login funciton on load
    const { cookies } = this.props;
    const csrftoken = cookies.get('csrftoken');
    let payload = { username_or_email: this.state.user.email, password: this.state.user.password };
    axios.post('/api/auth/login/?v=1.0', payload, { headers: {'X-CSRFToken': csrftoken }} ).then( (response) => {
      const authSuccessful = response.data.success;

      if (authSuccessful) {
        this.handleChange();
        this.setState({ redirectToReferrer: true });
      }

    });
  }

  changeUserCredentials(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }


  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;
    
    if (redirectToReferrer) {
      console.log("i'm Redirecting!", from);
      return (<Redirect to={from} />);
    }

    return(
    <MuiThemeProvider muiTheme={ThemeDefault}>
      <div>
        <div style={styles.loginContainer}>
          <Paper style={styles.paper}>
            <form>
              <TextField
                hintText="E-mail"
                floatingLabelText="E-mail"
                fullWidth={true}
                name="email"
                onChange={this.changeUserCredentials}
              />
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                fullWidth={true}
                type="password"
                name="password"
                onChange={this.changeUserCredentials}                
              />
              <div>
                <Checkbox
                  label="Remember me"
                  style={styles.checkRemember.style}
                  labelStyle={styles.checkRemember.labelStyle}
                  iconStyle={styles.checkRemember.iconStyle}
                />
                <RaisedButton label="Login"
                              primary={true}
                              style={styles.loginBtn}
                              onClick={this.login}
                                />
              </div>
            </form>
          </Paper>

          <div style={styles.buttonsDiv}>
            <FlatButton
              label="Register"
              href="/"
              style={styles.flatButton}
              icon={<PersonAdd />}
            />

            <FlatButton
              label="Forgot Password?"
              href="/"
              style={styles.flatButton}
              icon={<Help />}
            />
          </div>

          <div style={styles.buttonsDiv}>
            <Link to="/" style={{...styles.btn, ...styles.btnFacebook}}>
              <i className="fa fa-facebook fa-lg"/>
              <span style={styles.btnSpan}>Log in with Facebook</span>
            </Link>
            <Link to="/" style={{...styles.btn, ...styles.btnGoogle}}>
              <i className="fa fa-google-plus fa-lg"/>
              <span style={styles.btnSpan}>Log in with Google</span>
            </Link>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
    );
  }
}

export default withCookies(LoginPage);
