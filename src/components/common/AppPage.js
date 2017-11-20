import React from 'react';
import * as _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import Helmet from 'react-helmet';

import Navigation from '../Navigation';
import * as userActions from '../../actions/userActions';

class AppPage extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    title: PropTypes.string
  };

  isAuthenticated() {
    return _.isEmpty(this.props.user) ? false : true;
  }

  componentWillMount() {
    if (!this.isAuthenticated()) {
      this.props.actions.getCurrentUser();
    }
  }

  getTitle() {
    return this.props.title ? `Expense Manager - ${this.props.title}` : 'Expense Manager';
  }

  render() {
    if (!this.isAuthenticated()) return null;

    let title = this.getTitle();

    return (
      <div>
        <Helmet title={title} />

        <Navigation />

        {this.props.children}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppPage));
