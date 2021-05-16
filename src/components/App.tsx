import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {isEmpty} from 'lodash';
import styled from 'styled-components';

import {AppState} from 'reducers';

import AppPage from 'components/common/AppPage';
import Confirm from 'components/common/Confirm';
import ErrorBoundary from 'components/ErrorBoundary';

import commonActions from 'actions/commonActions';

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

interface Props {
  routes: any[];
  children?: any;
}

function App(props: Props) {
  let dispatch = useDispatch();

  const asyncAction = useSelector((state: AppState) => state.common.asyncAction);
  const confirmAction = useSelector((state: AppState) => state.common.confirmAction);

  function cancelAction() {
    dispatch(commonActions.confirmActionCancel());
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
    let showOverlay = asyncAction?.showOverlay ? true : false;

    return (
      <ErrorBoundary>
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
      </ErrorBoundary>
    );
  }

  return render();
}

export default App;
