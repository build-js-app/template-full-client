import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'components/bootstrap';
import AppIcon from 'components/common/AppIcon';

import {signUp} from 'actions/userActions';

import helper from 'helpers/reactHelper';
import uiHelper from 'helpers/uiHelper';

import TextInput from 'components/common/TextInput';

const stateMap = state => ({});

const actions = {
  signUp
};

class SignUpPage extends Component {
  state = {
    user: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    errors: {}
  };

  constructor(props) {
    super(props);

    helper.autoBind(this);
  }

  onChange(field, value) {
    let user = this.state.user;

    user[field] = value;

    return this.setState({user: user});
  }

  signUpFormIsValid() {
    let user = this.state.user;
    let errors = {};

    if (!user.firstName) {
      errors.firstName = 'First Name field is required.';
    }

    if (!user.lastName) {
      errors.lastName = 'Last Name field is required.';
    }

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

  async signUp() {
    if (!this.signUpFormIsValid()) return;

    let response = await this.props.signUp(this.state.user);

    if (response && response.message) {
      uiHelper.showMessage(response.message);

      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm={{size: 6, offset: 3}}>
            <h1>
              <AppIcon icon="sign-in" /> Sign Up
            </h1>

            <TextInput
              name="firstName"
              label="First Name"
              value={this.state.user.firstName}
              onChange={this.onChange}
              placeholder="First Name"
              error={this.state.errors.firstName}
            />

            <TextInput
              name="lastName"
              label="Last Name"
              value={this.state.user.lastName}
              onChange={this.onChange}
              placeholder="Last Name"
              error={this.state.errors.lastName}
            />

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

            <TextInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={this.state.user.confirmPassword}
              onChange={this.onChange}
              placeholder="Confirm Password"
              error={this.state.errors.confirmPassword}
            />

            <button className="btn btn-warning btn-lg" onClick={this.signUp}>
              Sign Up
            </button>

            <hr />

            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default helper.connect(SignUpPage, stateMap, actions, {withRouter: true});
