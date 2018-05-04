import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

import helper from 'helpers/reactHelper';

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

        <Switch>
          {this.props.routes.map((route, index) => (
            <Route key={index} exact={route.exact} path={route.path} component={route.main} />
          ))};
        </Switch>

        {this.props.children}
      </div>
    );
  }
}

export default helper.connect(App, stateMap, actions);
