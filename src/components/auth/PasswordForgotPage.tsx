import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Button} from 'components/bootstrap';

import userActions from 'actions/userActions';

import validationHelper from 'helpers/validationHelper';

import TextInput from 'components/common/TextInput';

function PasswordForgotPage() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState({email: ''});

  function onChange(field: string, value: string) {
    setEmail(value);
  }

  function forgotFormIsValid() {
    const errors = {
      email: ''
    };

    if (!email) {
      errors.email = 'Email field is required.';
    } else if (!validationHelper.isValidEmail(email)) {
      errors.email = 'Email is not valid.';
    }

    setErrors(errors);

    return validationHelper.isEmptyErrorObject(errors);
  }

  async function resetPassword() {
    if (!forgotFormIsValid()) return;

    await dispatch(userActions.forgotPassword(email));
  }

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
            onChange={onChange}
            placeholder="Email"
            error={errors.email}
          />

          <Button variant="warning" size="lg" onClick={resetPassword}>
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

export default PasswordForgotPage;
