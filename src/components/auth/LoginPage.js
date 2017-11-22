import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, withRouter} from 'react-router-dom';
import * as _ from 'lodash';

import TextInput from '../common/TextInput';
import * as userActions from '../../actions/userActions';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: ''
      },
      errors: {}
    };

    autoBind(this);
  }

  componentWillMount() {
    if (!_.isEmpty(this.props.user)) {
      this.props.history.push('/');
    }
  }

  onChange(field, value) {
    let user = this.state.user;

    user[field] = value;

    return this.setState({user: user});
  }

  loginFormIsValid() {
    let user = this.state.user;
    let errors = {};

    if (!user.email) {
      errors.email = 'Email field is required.';
    } else if (!this.isValidEmail(user.email)) {
      errors.email = 'Email is not valid.';
    }

    if (!user.password) {
      errors.password = 'Password field is required.';
    }

    this.setState({errors: errors});

    return Object.keys(errors).length === 0;
  }

  isValidEmail(email) {
    let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  async login() {
    if (!this.loginFormIsValid()) return;

    await this.props.actions.loginUser(this.state.user);

    await this.props.actions.getCurrentUser();

    if (!_.isEmpty(this.props.user)) this.props.history.push('/records');
  }

  render() {
    return (
      <div className="container">
        <div className="col-xs-12 col-sm-6 col-sm-offset-3">
          <h1>
            <span className="fa fa-sign-in" /> Login
          </h1>

          <TextInput
            name="email"
            label="Email"
            type="email"
            value={this.state.user.email}
            onChange={this.onChange}
            placeholder="Email"
            error={this.state.errors.email}
          />

          <TextInput
            name="password"
            label="Password"
            type="password"
            value={this.state.user.password}
            onChange={this.onChange}
            placeholder="Password"
            error={this.state.errors.password}
          />

          <button className="btn btn-warning btn-lg" onClick={this.login}>
            Login
          </button>

          <hr />

          <Link to="/password-forgot">Forgot your password?</Link>

          <hr />

          <p>
            Need an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
