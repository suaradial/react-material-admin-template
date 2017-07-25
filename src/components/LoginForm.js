import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';

import ThemeDefault from '../theme-default';
// Move styles into this module
import styles from '../containers/LoginPage/styles';

const LoginForm = (props) =>{

  let errorText = "";
  if (props.authError) errorText = "Username or Password is invalid.";

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
                  onChange={props.changeUserCredentials}
                />
                <TextField
                  hintText="Password"
                  floatingLabelText="Password"
                  fullWidth={true}
                  type="password"
                  name="password"
                  onChange={props.changeUserCredentials}
                  errorText={errorText}
                />
                <div>
                  <Checkbox
                    label="Remember me"
                    style={styles.checkRemember.style}
                    labelStyle={styles.checkRemember.labelStyle}
                    iconStyle={styles.checkRemember.iconStyle}
                  />
                  <RaisedButton 
                    label="Login"
                    primary={true}
                    style={styles.loginBtn}
                    onClick={props.login}
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
          </div>
        </div>
  </MuiThemeProvider>)
};

export default LoginForm;