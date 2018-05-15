import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import helper from 'helpers/reactHelper';
import uiHelper from 'helpers/uiHelper';

import TextInput from 'components/common/TextInput';
import {resetPassword, checkResetToken} from 'actions/userActions';

const stateMap = state => ({});

const actions = {
  resetPassword,
  checkResetToken
};

class PasswordResetPage extends Component {
  state = {
    userData: {
      email: '',
      password: '',
      confirmPassword: '',
      token: ''
    },
    errors: {}
  };

  constructor(props) {
    super(props);

    helper.autoBind(this);
  }

  componentDidMount() {
    this.checkResetToken();
  }

  onChange(field, value) {
    let user = this.state.userData;

    user[field] = value;

    return this.setState({userData: user});
  }

  resetFormIsValid() {
    let user = this.state.userData;
    let errors = {};

    if (!user.email) {
      errors.email = 'Email field is required.';
    } else if (!this.isValidEmail(user.email)) {
      errors.email = 'Email is not valid.';
    }

    if (!user.password) {
      errors.password = 'Password field is required.';
    }

    if (!user.confirmPassword) {
      errors.confirmPassword = 'Please confirm the password.';
    }

    if (user.password && user.confirmPassword && user.password !== user.confirmPassword) {
      errors.confirmPassword = 'Wrong password.';
    }

    this.setState({errors: errors});

    return Object.keys(errors).length === 0;
  }

  isValidEmail(email) {
    let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  async checkResetToken() {
    let token = this.props.match.params.token;

    let data = await this.props.checkResetToken(token);

    if (data) {
      this.setState({
        userData: Object.assign({}, {email: data.email, token: data.token})
      });
    }
  }

  async resetPassword() {
    if (!this.resetFormIsValid()) return;

    let response = await this.props.resetPassword(this.state.userData);

    if (response && response.message) {
      uiHelper.showMessage(response.message);

      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <div className="container">
        <div className="col-xs-12 col-sm-6 col-sm-offset-3">
          <h1>Reset Password</h1>

          <TextInput
            name="email"
            label="Email"
            type="email"
            disabled={true}
            value={this.state.userData.email}
            onChange={this.onChange}
            placeholder="Email"
            error={this.state.errors.email}
          />

          <TextInput
            name="password"
            label="New Password"
            type="password"
            value={this.state.userData.password}
            onChange={this.onChange}
            placeholder="New password"
            error={this.state.errors.password}
          />

          <TextInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={this.state.userData.confirmPassword}
            onChange={this.onChange}
            placeholder="Confirm password"
            error={this.state.errors.confirmPassword}
          />

          <button className="btn btn-warning btn-lg" onClick={this.resetPassword}>
            Save Password
          </button>

          <hr />

          <p>
            Redirect to login page: <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default helper.connect(PasswordResetPage, stateMap, actions, {withRouter: true});