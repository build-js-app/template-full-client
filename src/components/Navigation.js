import React, {Component} from 'react';
import {Navbar, Nav, NavItem, Glyphicon, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as userActions from '../actions/userActions';

class Navigation extends Component {
  async onLogOut() {
    await this.props.actions.logOut();

    this.props.history.push('/login');
  }

  render() {
    let user = this.props.user;

    let userFullName = '';

    if (user && user.profile && user.profile.local) {
      let local = user.profile.local;

      userFullName = `${local.firstName} ${local.lastName}`;
    }

    return (
      <Navbar collapseOnSelect fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Button bsStyle="link">Expense Manager</Button>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            <LinkContainer key={1} to={'/records'}>
              <NavItem>Records</NavItem>
            </LinkContainer>

            <LinkContainer key={2} to={'/categories'}>
              <NavItem>Categories</NavItem>
            </LinkContainer>
          </Nav>

          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              Logged as: <b>{userFullName}</b>
            </NavItem>

            <NavItem eventKey={2} onClick={() => this.onLogOut()}>
              LogOut <Glyphicon glyph="log-out" />
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.current
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));
