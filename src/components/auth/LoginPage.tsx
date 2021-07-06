import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {Container, Row, Col, Button} from 'components/bootstrap';
import {isEmpty} from 'lodash';

import userActions from 'actions/userActions';
import {AppState} from 'reducers';

import validationHelper from 'helpers/validationHelper';

import AppIcon from 'components/common/AppIcon';
import TextInput from 'components/common/TextInput';

function LoginPage() {
  const currentUser = useSelector((state: AppState) => state.user.current);

  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState({email: '', password: ''});

  const [errors, setErrors] = useState({email: '', password: ''});

  useEffect(() => {
    if (!isEmpty(currentUser)) history.push('/');
  });

  function onChange(field: string, value) {
    const newUser = {...user};

    newUser[field] = value;

    setUser(newUser);
  }

  function loginFormIsValid() {
    const errors = {
      email: '',
      password: ''
    };

    if (!user.email) {
      errors.email = 'Email field is required.';
    } else if (!validationHelper.isValidEmail(user.email)) {
      errors.email = 'Email is not valid.';
    }

    if (!user.password) {
      errors.password = 'Password field is required.';
    }

    setErrors(errors);

    return validationHelper.isEmptyErrorObject(errors);
  }

  async function login(e) {
    if (e) e.preventDefault();

    if (!loginFormIsValid()) return;

    await dispatch(userActions.loginUser(user));

    await dispatch(userActions.getCurrentUser());

    if (!isEmpty(user)) history.push('/records');
  }

  return (
    <Container>
      <Row>
        <Col sm={{span: 6, offset: 3}}>
          <h1>
            <AppIcon icon="sign-in" /> Login
          </h1>

          <form onSubmit={login}>
            <TextInput
              name="email"
              label="Email"
              type="email"
              value={user.email}
              onChange={onChange}
              placeholder="Email"
              error={errors.email}
            />

            <TextInput
              name="password"
              label="Password"
              type="password"
              value={user.password}
              onChange={onChange}
              placeholder="Password"
              error={errors.password}
            />

            <Button variant="warning" size="lg" type="submit" onClick={login}>
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

export default LoginPage;
