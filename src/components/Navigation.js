import React, {Component} from 'react';
import {Navbar, Collapse, Nav, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'components/bootstrap';
import AppIcon from 'components/common/AppIcon';
import {NavLink as RRNavLink} from 'react-router-dom';

import helper from 'helpers/reactHelper';

import {logOut} from 'actions/userActions';

const stateMap = state => ({
  user: state.user.current
});

const actions = {
  logOut
};

class Navigation extends Component {
  state = {
    isOpen: false
  };

  constructor(props) {
    super(props);

    helper.autoBind(this);
  }

  async onLogOut() {
    await this.props.logOut();

    this.props.history.push('/login');
  }

  toggle() {
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    let user = this.props.user;

    let userFullName = '';

    if (user && user.profile && user.profile.local) {
      let local = user.profile.local;

      userFullName = `${local.firstName} ${local.lastName}`;
    }

    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand>Expense Manager</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink activeClassName="active" tag={RRNavLink} to="/records">
                Records
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink activeClassName="active" tag={RRNavLink} to="/categories">
                Categories
              </NavLink>
            </NavItem>
          </Nav>
          <Nav navbar className="ml-auto">
            <NavItem>
              <span className="navbar-text" style={{marginRight: 20}}>
                Logged as: <b>{userFullName}</b>
              </span>
            </NavItem>
            <NavItem onClick={() => this.onLogOut()}>
              <NavLink href="#">
                LogOut <AppIcon icon="sign-out" />
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default helper.connect(Navigation, stateMap, actions, {withRouter: true});
