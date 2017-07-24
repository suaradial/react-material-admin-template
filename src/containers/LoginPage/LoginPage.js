import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {withCookies}  from 'react-cookie';

import LoginForm from '../../components/LoginForm';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      user: {
        email: '',
        password: ''
      },
      authError: false,
    };

    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeUserCredentials = this.changeUserCredentials.bind(this);
  }

  handleChange() {
    this.props.handleAuthenticationUpdate();
  }

  login() {
    const { cookies } = this.props;
    const csrftoken = cookies.get('csrftoken');
    let payload = { username_or_email: this.state.user.email, password: this.state.user.password };

    axios.post('/api/auth/login/?v=1.0', payload, { headers: {'X-CSRFToken': csrftoken }} ).then( (response) => {
      const authSuccessful = response.data.success;

    if (authSuccessful) {
        this.handleChange();
        this.setState({ redirectToReferrer: true });
      }
      
    }).catch( () => { 
      this.setState({authError: true}); 
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
      return (<Redirect to={from} />);
    }

    return(
      <LoginForm login={this.login} changeUserCredentials={this.changeUserCredentials} authError={this.state.authError} />
    );
  }
}

export default withCookies(LoginPage);
