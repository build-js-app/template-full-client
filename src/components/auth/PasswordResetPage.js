import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Button} from 'components/bootstrap';

import helper from 'helpers/reactHelper';
import validationHelper from 'helpers/validationHelper';
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
    } else if (!validationHelper.isValidEmail(user.email)) {
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

  async checkResetToken() {
    let token = this.props.match.params.token;

    let data = await this.props.checkResetToken(token);

    if (data) {
      this.setState({
        userData: {email: data.email, token: data.token}
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
      <Container>
        <Row>
          <Col sm={{span: 6, offset: 3}}>
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

            <Button variant="warning" size="lg" onClick={this.resetPassword}>
              Save Password
            </Button>

            <hr />

            <p>
              Redirect to login page: <Link to="/login">Login</Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default helper.connect(
  PasswordResetPage,
  stateMap,
  actions,
  {withRouter: true}
);
