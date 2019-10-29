import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Button} from '../bootstrap';

import {signUp} from '../../actions/userActions';

import helper from '../../helpers/reactHelper';
import validationHelper from '../../helpers/validationHelper';
import uiHelper from '../../helpers/uiHelper';

import AppIcon from '../common/AppIcon';
import TextInput from '../common/TextInput';

const stateMap = state => ({});

const actions = {
  signUp
};

class SignUpPage extends Component<any, any> {
  state = {
    user: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    errors: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  };

  constructor(props) {
    super(props);

    helper.autoBind(this);
  }

  onChange(field: string, value) {
    let user = this.state.user;

    user[field] = value;

    return this.setState({user: user});
  }

  signUpFormIsValid() {
    let user = this.state.user;
    let errors: any = {};

    if (!user.firstName) {
      errors.firstName = 'First Name field is required.';
    }

    if (!user.lastName) {
      errors.lastName = 'Last Name field is required.';
    }

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

  async signUp() {
    if (!this.signUpFormIsValid()) return;

    let response = await this.props.signUp(this.state.user);

    if (response && response.message) {
      uiHelper.showMessage(response.message);

      this.props.history.push('/login');
    }
  }

  render() {
    const {user, errors} = this.state;

    return (
      <Container>
        <Row>
          <Col sm={{span: 6, offset: 3}}>
            <h1>
              <AppIcon icon="sign-in" /> Sign Up
            </h1>

            <TextInput
              name="firstName"
              label="First Name"
              value={user.firstName}
              onChange={this.onChange}
              placeholder="First Name"
              error={errors.firstName}
            />

            <TextInput
              name="lastName"
              label="Last Name"
              value={user.lastName}
              onChange={this.onChange}
              placeholder="Last Name"
              error={errors.lastName}
            />

            <TextInput
              name="email"
              label="Email"
              type="email"
              value={user.email}
              onChange={this.onChange}
              placeholder="Email"
              error={errors.email}
            />

            <TextInput
              name="password"
              label="Password"
              type="password"
              value={user.password}
              onChange={this.onChange}
              placeholder="Password"
              error={errors.password}
            />

            <TextInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={user.confirmPassword}
              onChange={this.onChange}
              placeholder="Confirm Password"
              error={errors.confirmPassword}
            />

            <Button variant="warning" size="lg" onClick={this.signUp}>
              Sign Up
            </Button>

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
