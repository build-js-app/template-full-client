import React, {Component} from 'react';
import {Nav, Navbar} from './bootstrap';
import {Link} from 'react-router-dom';

import {logOut} from '../actions/userActions';

import helper from '../helpers/reactHelper';

import AppIcon from './common/AppIcon';

const stateMap = (state: any) => ({
  user: state.user.current
});

const actions = {
  logOut
};

class Navigation extends Component<any, any> {
  state = {};

  constructor(props: any) {
    super(props);

    helper.autoBind(this);
  }

  async onLogOut() {
    await this.props.logOut();

    this.props.history.push('/login');
  }

  render() {
    const {user, location} = this.props;

    let userFullName = '';

    if (user && user.profile && user.profile.local) {
      let local = user.profile.local;

      userFullName = `${local.firstName} ${local.lastName}`;
    }

    return (
      <Navbar bg="light" variant="light" expand="md">
        <Navbar.Brand>Expense Manager</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link as={Link} href="/records" to="/records" active={location.pathname === '/records'}>
              Records
            </Nav.Link>

            <Nav.Link as={Link} href="/categories" to="/categories" active={location.pathname === '/categories'}>
              Categories
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <span className="navbar-text" style={{marginRight: 20}}>
              Logged as: <b>{userFullName}</b>
            </span>

            <Nav.Link href="#" onClick={() => this.onLogOut()}>
              LogOut <AppIcon icon="sign-out" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default helper.connect(Navigation, stateMap, actions, {withRouter: true});
