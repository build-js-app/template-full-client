import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import helper from 'helpers/reactHelper';

import AppPage from 'components/common/AppPage';

import '../styles/App.css';

const stateMap = state => ({
  isAjaxLoad: state.common.ajaxCallsInProgress
});

const actions = {};

class App extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired
  };

  state = {
    isAjaxLoad: false
  };

  constructor(props) {
    super(props);

    helper.autoBind(this);
  }

  render() {
    return (
      <div>
        {this.props.isAjaxLoad && <div className="overlay-style" />}

        <Switch>{this.props.routes.map((route, index) => this.renderRoute(route, index))};</Switch>

        {this.props.children}
      </div>
    );
  }

  renderRoute(route, index) {
    const {pageProps, component: Component} = route;

    let wrapInAppPage = !_.isEmpty(pageProps);

    let render = props => <Component {...props} />;

    if (wrapInAppPage) {
      render = props => (
        <AppPage {...pageProps}>
          <Component {...props} />
        </AppPage>
      );
    }

    return <Route key={index} exact={route.exact} path={route.path} render={render} />;
  }
}

export default helper.connect(App, stateMap, actions, {withRouter: true});
