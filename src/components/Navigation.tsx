import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Nav, Navbar} from './bootstrap';
import {Link, useHistory, useLocation} from 'react-router-dom';

import {logOut} from 'actions/userActions';

import AppIcon from 'components/common/AppIcon';

function Navigation() {
  let dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();

  const user = useSelector((state: any) => state.user.current);

  const onLogOut = async () => {
    await dispatch(logOut());

    history.push('/login');
  };

  let userFullName = '';

  if (user && user.profile && user.profile.local) {
    let local = user.profile.local;

    userFullName = `${local.firstName} ${local.lastName}`;
  }

  let pathName = location.pathname;

  return (
    <Navbar bg="light" variant="light" expand="md">
      <Navbar.Brand>Expense Manager</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav>
          <Nav.Link as={Link} href="/records" to="/records" active={pathName === '/records'}>
            Records
          </Nav.Link>

          <Nav.Link as={Link} href="/categories" to="/categories" active={pathName === '/categories'}>
            Categories
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <span className="navbar-text" style={{marginRight: 20}}>
            Logged as: <b>{userFullName}</b>
          </span>

          <Nav.Link href="#" onClick={onLogOut}>
            LogOut <AppIcon icon="sign-out" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
