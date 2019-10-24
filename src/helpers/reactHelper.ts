import reactAutoBind from 'react-autobind';
import _ from 'lodash';
import {connect as reduxConnect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';

export default {
  autoBind,
  connect,
  getKey
};

function autoBind(self: any) {
  reactAutoBind(self);
}

function connect(component: any, stateMap: any, actions: any, options: any = {}) {
  let mapStateToProps = stateMap;
  if (mapStateToProps && !_.isFunction(mapStateToProps)) {
    throw new Error('State Map should be a function');
  }

  let mapDispatchToProps: any = null;
  if (!_.isEmpty(actions)) {
    mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch);
  }

  if (!mapStateToProps && !mapDispatchToProps) {
    return component;
  }

  let result: any = reduxConnect(mapStateToProps, mapDispatchToProps)(component);

  if (options.withRouter) {
    result = withRouter(result);
  }

  return result;
}

function getKey() {
  let randomKey = Math.random()
    .toString(36)
    .substring(7);

  return randomKey;
}
