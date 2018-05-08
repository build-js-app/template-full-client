import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import helper from 'helpers/reactHelper';

import AppPage from 'components/common/AppPage';
import Confirm from 'components/common/Confirm';

import {confirmActionCancel} from 'actions/commonActions';

import '../styles/App.css';

const stateMap = state => ({
  isFetchingData: state.common.asyncActionInProgress,
  confirmAction: state.common.confirmAction
});

const actions = {
  confirmActionCancel
};

class App extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired
  };

  state = {
    isFetchingData: false
  };

  constructor(props) {
    super(props);

    helper.autoBind(this);
  }

  render() {
    const {confirmAction} = this.props;

    return (
      <div>
        {this.props.isFetchingData && <div className="overlay-style" />}

        {confirmAction && (
          <Confirm
            title={confirmAction.title}
            text={confirmAction.text}
            visible={true}
            action={async () => {
              this.props.confirmActionCancel();
              await confirmAction.action();
            }}
            close={this.props.confirmActionCancel}
          />
        )}

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
