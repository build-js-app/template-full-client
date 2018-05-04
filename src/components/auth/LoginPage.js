import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as _ from 'lodash';

import helper from 'helpers/reactHelper';

import TextInput from 'components/common/TextInput';
import {loginUser, getCurrentUser} from 'actions/userActions';

const stateMap = state => ({
  user: state.user.current
});

const actions = {
  loginUser,
  getCurrentUser
};

class LoginPage extends Component {
  state = {
    user: {
      email: '',
      password: ''
    },
    errors: {}
  };

  constructor(props) {
    super(props);

    helper.autoBind(this);
  }

  componentDidMount() {
    if (!_.isEmpty(this.props.user)) {
      this.props.history.push('/');
    }
  }

  onChange(field, value) {
    let user = this.state.user;

    user[field] = value;

    return this.setState({user: user});
  }

  loginFormIsValid() {
    let user = this.state.user;
    let errors = {};

    if (!user.email) {
      errors.email = 'Email field is required.';
    } else if (!this.isValidEmail(user.email)) {
      errors.email = 'Email is not valid.';
    }

    if (!user.password) {
      errors.password = 'Password field is required.';
    }

    this.setState({errors: errors});

    return Object.keys(errors).length === 0;
  }

  isValidEmail(email) {
    let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  async login() {
    if (!this.loginFormIsValid()) return;

    await this.props.loginUser(this.state.user);

    await this.props.getCurrentUser();

    if (!_.isEmpty(this.props.user)) this.props.history.push('/records');
  }

  render() {
    return (
      <div className="container">
        <div className="col-xs-12 col-sm-6 col-sm-offset-3">
          <h1>
            <span className="fa fa-sign-in" /> Login
          </h1>

          <TextInput
            name="email"
            label="Email"
            type="email"
            value={this.state.user.email}
            onChange={this.onChange}
            placeholder="Email"
            error={this.state.errors.email}
          />

          <TextInput
            name="password"
            label="Password"
            type="password"
            value={this.state.user.password}
            onChange={this.onChange}
            placeholder="Password"
            error={this.state.errors.password}
          />

          <button className="btn btn-warning btn-lg" onClick={this.login}>
            Login
          </button>

          <hr />

          <Link to="/password-forgot">Forgot your password?</Link>

          <hr />

          <p>
            Need an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default helper.connect(LoginPage, stateMap, actions, {withRouter: true});
