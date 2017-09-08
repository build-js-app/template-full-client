import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import autoBind from 'react-autobind';
import {Switch, Route, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/App.css';

class App extends Component {
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

const mapStateToProps = state => ({
  isAjaxLoad: state.common.ajaxCallsInProgress
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
