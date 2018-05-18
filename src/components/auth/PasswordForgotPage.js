import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'components/bootstrap';

import helper from 'helpers/reactHelper';

import TextInput from 'components/common/TextInput';
import {forgotPassword} from 'actions/userActions';

const stateMap = state => ({});

const actions = {
  forgotPassword
};

class PasswordForgotPage extends Component {
  state = {
    email: '',
    errors: {}
  };

  constructor(props) {
    super(props);

    helper.autoBind(this);
  }

  onChange(field, value) {
    return this.setState({email: value});
  }

  forgotFormIsValid() {
    let errors = {};

    if (!this.state.email) {
      errors.email = 'Email field is required.';
    } else if (!this.isValidEmail(this.state.email)) {
      errors.email = 'Email is not valid.';
    }

    this.setState({errors: errors});

    return Object.keys(errors).length === 0;
  }

  isValidEmail(email) {
    let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  async resetPassword() {
    if (!this.forgotFormIsValid()) return;

    await this.props.forgotPassword(this.state.email);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm={{size: 6, offset: 3}}>
            <h1>Reset Password</h1>

            <TextInput
              name="email"
              label="Email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="Email"
              error={this.state.errors.email}
            />

            <button className="btn btn-warning btn-lg" onClick={this.resetPassword}>
              Reset Password
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

export default helper.connect(PasswordForgotPage, stateMap, actions);
