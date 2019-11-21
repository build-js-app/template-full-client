import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {Container, Row, Col, Button} from 'components/bootstrap';
import _ from 'lodash';

import {loginUser, getCurrentUser} from 'actions/userActions';

import validationHelper from 'helpers/validationHelper';

import AppIcon from 'components/common/AppIcon';
import TextInput from 'components/common/TextInput';

function LoginPage() {
  const currentUser = useSelector((state: any) => state.user.current);

  const dispatch = useDispatch();
  let history = useHistory();

  const [user, setUser] = useState({email: '', password: ''});

  const [errors, setErrors] = useState({email: '', password: ''});

  useEffect(() => {
    if (!_.isEmpty(currentUser)) history.push('/');
  });

  const onChange = (field: string, value) => {
    let newUser = {...user};

    newUser[field] = value;

    setUser(newUser);
  };

  const loginFormIsValid = () => {
    let errors = {
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

    return Object.keys(errors).length === 0;
  };

  const login = async e => {
    if (e) e.preventDefault();

    if (!loginFormIsValid()) return;

    await dispatch(loginUser(user));

    await dispatch(getCurrentUser());

    if (!_.isEmpty(user)) history.push('/records');
  };

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
