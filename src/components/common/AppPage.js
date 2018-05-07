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
    if (this.props.public) return true;
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

  isReady() {
    return this.isAuthenticated();
  }

  render() {
    const {public: isPublic} = this.props;

    if (!this.isReady()) return null;

    let title = this.getTitle();

    return (
      <div>
        <Helmet title={title} />

        {!isPublic && <Navigation />}

        {this.props.children}
      </div>
    );
  }
}

export default helper.connect(AppPage, stateMap, actions, {withRouter: true});
