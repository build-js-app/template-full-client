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

function autoBind(self) {
  reactAutoBind(self);
}

function connect(component, stateMap, actions, options = {}) {
  let mapStateToProps = stateMap;
  if (mapStateToProps && !_.isFunction(mapStateToProps)) {
    throw new Error('State Map should be a function');
  }

  let mapDispatchToProps = null;
  if (!_.isEmpty(actions)) {
    mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
  }

  if (!mapStateToProps && !mapDispatchToProps) {
    return component;
  }

  let result = reduxConnect(mapStateToProps, mapDispatchToProps)(component);

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
