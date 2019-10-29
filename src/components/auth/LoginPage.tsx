import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Button} from './../bootstrap';
import _ from 'lodash';

import {loginUser, getCurrentUser} from '../../actions/userActions';

import helper from '../../helpers/reactHelper';
import validationHelper from '../../helpers/validationHelper';

import AppIcon from './../common/AppIcon';
import TextInput from './../common/TextInput';

const stateMap = state => ({
  user: state.user.current
});

const actions = {
  loginUser,
  getCurrentUser
};

class LoginPage extends Component<any, any> {
  state = {
    user: {
      email: '',
      password: ''
    },
    errors: {
      email: '',
      password: ''
    }
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

  onChange(field: string, value) {
    let user = this.state.user;

    user[field] = value;

    return this.setState({user: user});
  }

  loginFormIsValid() {
    let user = this.state.user;
    let errors: any = {};

    if (!user.email) {
      errors.email = 'Email field is required.';
    } else if (!validationHelper.isValidEmail(user.email)) {
      errors.email = 'Email is not valid.';
    }

    if (!user.password) {
      errors.password = 'Password field is required.';
    }

    this.setState({errors: errors});

    return Object.keys(errors).length === 0;
  }

  async login(e) {
    if (e) e.preventDefault();

    if (!this.loginFormIsValid()) return;

    await this.props.loginUser(this.state.user);

    await this.props.getCurrentUser();

    if (!_.isEmpty(this.props.user)) this.props.history.push('/records');
  }

  render() {
    const {user, errors} = this.state;

    return (
      <Container>
        <Row>
          <Col sm={{span: 6, offset: 3}}>
            <h1>
              <AppIcon icon="sign-in" /> Login
            </h1>

            <form onSubmit={this.login}>
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

              <Button variant="warning" size="lg" type="submit" onClick={this.login}>
                Login
              </Button>
            </form>

            <hr />

            <Link to="/password-forgot">Forgot your password?</Link>

            <hr />

            <p>
              Need an account? <Link to="/sign-up">Sign Up</Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default helper.connect(LoginPage, stateMap, actions, {withRouter: true});
