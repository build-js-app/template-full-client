import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import autoBind from 'react-autobind';
import {Switch, Route, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/App.css';
import * as userActions from '../actions/userActions';

class App extends React.Component {
  static propTypes = {
    routes: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isAjaxLoad: props.isAjaxLoad
    };

    autoBind(this);
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

function mapStateToProps(state) {
  return {
    isAjaxLoad: state.ajaxCallsInProgress
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
