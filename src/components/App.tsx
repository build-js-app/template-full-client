import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {isEmpty, get} from 'lodash';
import styled from 'styled-components';

import {AppState} from 'reducers';

import AppPage from 'components/common/AppPage';
import Confirm from 'components/common/Confirm';

import {confirmActionCancel} from 'actions/commonActions';

import 'styles/App.scss';

const StyledUiBlock = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: #000;
  opacity: 0.3;
  filter: alpha(opacity=30);
  z-index: 999;
`;

App.propTypes = {
  routes: PropTypes.array.isRequired
};

function App(props) {
  let dispatch = useDispatch();

  const asyncAction = useSelector((state: AppState) => state.common.asyncAction);
  const confirmAction = useSelector((state: AppState) => state.common.confirmAction);

  function cancelAction() {
    dispatch(confirmActionCancel());
  }

  function renderRoute(route, index: number) {
    const {pageProps, component: Component} = route;

    let wrapInAppPage = !isEmpty(pageProps);

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

  function render() {
    let showOverlay = get(asyncAction, 'showOverlay', false);

    return (
      <div>
        {showOverlay && <StyledUiBlock />}

        {confirmAction && (
          <Confirm
            title={confirmAction.title}
            text={confirmAction.text}
            visible={true}
            action={async () => {
              cancelAction();
              await confirmAction.action();
            }}
            close={cancelAction}
          />
        )}

        <Switch>{props.routes.map((route, index: number) => renderRoute(route, index))}</Switch>

        {props.children}
      </div>
    );
  }

  return render();
}

export default App;
