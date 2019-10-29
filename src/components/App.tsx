import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import helper from '../helpers/reactHelper';

import AppPage from '../components/common/AppPage';
import Confirm from '../components/common/Confirm';

import {confirmActionCancel} from '../actions/commonActions';

import '../styles/App.scss';

const stateMap = state => ({
  asyncAction: state.common.asyncAction,
  confirmAction: state.common.confirmAction
});

const actions = {
  confirmActionCancel
};

class App extends Component<any, any> {
  static propTypes = {
    routes: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    helper.autoBind(this);
  }

  render() {
    const {confirmAction} = this.props;
    const {asyncAction} = this.props;

    let showOverlay = _.get(asyncAction, 'showOverlay', false);

    return (
      <div>
        {showOverlay && <div className="ui-block" />}

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

        <Switch>{this.props.routes.map((route, index: number) => this.renderRoute(route, index))}</Switch>

        {this.props.children}
      </div>
    );
  }

  renderRoute(route, index: number) {
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
