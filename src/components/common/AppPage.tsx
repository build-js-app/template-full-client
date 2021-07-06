import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {isEmpty} from 'lodash';
import Helmet from 'react-helmet';

import userActions from 'actions/userActions';
import {AppState} from 'reducers';

import Navigation from 'components/Navigation';

interface Props {
  title: string;
  public?: boolean;
  children?: any;
}

function AppPage(props: Props) {
  const dispatch = useDispatch();

  const user = useSelector((state: AppState) => state.user.current);

  useEffect(() => {
    if (!isAuthenticated()) dispatch(userActions.getCurrentUser());
  });

  function isAuthenticated() {
    if (props.public) return true;
    return !isEmpty(user);
  }

  function getTitle() {
    return props.title ? `Expense Manager - ${props.title}` : 'Expense Manager';
  }

  function isReady() {
    return isAuthenticated();
  }

  function render() {
    if (!isReady()) return null;

    const title = getTitle();

    return (
      <div>
        <Helmet title={title} />

        {!props.public && <Navigation />}

        {props.children}
      </div>
    );
  }

  return render();
}

export default AppPage;
