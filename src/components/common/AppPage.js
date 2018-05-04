import React from 'react';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import helper from 'helpers/reactHelper';

import Navigation from '../Navigation';
import {getCurrentUser} from 'actions/userActions';

const stateMap = state => ({
  user: state.user.current
});

const actions = {
  getCurrentUser
};

class AppPage extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    title: PropTypes.string
  };

  isAuthenticated() {
    return _.isEmpty(this.props.user) ? false : true;
  }

  async componentDidMount() {
    if (!this.isAuthenticated()) {
      await this.props.getCurrentUser();
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

export default helper.connect(AppPage, stateMap, actions, {withRouter: true});
