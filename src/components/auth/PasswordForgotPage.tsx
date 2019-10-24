import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Button} from '../bootstrap';

import {forgotPassword} from '../../actions/userActions';

import helper from '../../helpers/reactHelper';
import validationHelper from '../../helpers/validationHelper';

import TextInput from '../common/TextInput';

const stateMap = (state: any) => ({});

const actions = {
  forgotPassword
};

class PasswordForgotPage extends Component<any, any> {
  state = {
    email: '',
    errors: {
      email: ''
    }
  };

  constructor(props: any) {
    super(props);

    helper.autoBind(this);
  }

  onChange(field: string, value: string) {
    return this.setState({email: value});
  }

  forgotFormIsValid() {
    let errors: any = {};

    if (!this.state.email) {
      errors.email = 'Email field is required.';
    } else if (!validationHelper.isValidEmail(this.state.email)) {
      errors.email = 'Email is not valid.';
    }

    this.setState({errors: errors});

    return Object.keys(errors).length === 0;
  }

  async resetPassword() {
    if (!this.forgotFormIsValid()) return;

    await this.props.forgotPassword(this.state.email);
  }

  render() {
    const {email, errors} = this.state;

    return (
      <Container>
        <Row>
          <Col sm={{span: 6, offset: 3}}>
            <h1>Reset Password</h1>

            <TextInput
              name="email"
              label="Email"
              type="email"
              value={email}
              onChange={this.onChange}
              placeholder="Email"
              error={errors.email}
            />

            <Button variant="warning" size="lg" onClick={this.resetPassword}>
              Reset Password
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

export default helper.connect(PasswordForgotPage, stateMap, actions);
