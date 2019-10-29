import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Button} from '../bootstrap';

import {resetPassword, checkResetToken} from '../../actions/userActions';

import helper from '../../helpers/reactHelper';
import validationHelper from '../../helpers/validationHelper';
import uiHelper from '../../helpers/uiHelper';

import TextInput from '../common/TextInput';

const stateMap = state => ({});

const actions = {
  resetPassword,
  checkResetToken
};

class PasswordResetPage extends Component<any, any> {
  state = {
    userData: {
      email: '',
      password: '',
      confirmPassword: '',
      token: ''
    },
    errors: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  };

  constructor(props) {
    super(props);

    helper.autoBind(this);
  }

  componentDidMount() {
    this.checkResetToken();
  }

  onChange(field: string, value) {
    let user = this.state.userData;

    user[field] = value;

    return this.setState({userData: user});
  }

  resetFormIsValid() {
    let user = this.state.userData;
    let errors: any = {};

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
    const {userData, errors} = this.state;

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
              value={userData.email}
              onChange={this.onChange}
              placeholder="Email"
              error={errors.email}
            />

            <TextInput
              name="password"
              label="New Password"
              type="password"
              value={userData.password}
              onChange={this.onChange}
              placeholder="New password"
              error={errors.password}
            />

            <TextInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={userData.confirmPassword}
              onChange={this.onChange}
              placeholder="Confirm password"
              error={errors.confirmPassword}
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

export default helper.connect(PasswordResetPage, stateMap, actions, {withRouter: true});
