import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {FontAwesomeIcon as FaIcon} from '@fortawesome/react-fontawesome';

//reduce bundle size by importing required icons only
import {faPlus, faTrashAlt, faPencilAlt, faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {faQuestionCircle} from '@fortawesome/free-regular-svg-icons';

const unknownIcon = faQuestionCircle;

let map = {
  plus: faPlus,
  delete: faTrashAlt,
  edit: faPencilAlt,
  'sign-out': faSignOutAlt,
  'sign-in': faSignInAlt
};

class AppIcon extends Component<any, any> {
  static propTypes = {
    icon: PropTypes.string.isRequired
  };

  render() {
    let icon = unknownIcon;
    let props = this.props;

    if (map[props.icon]) {
      icon = map[props.icon];
    }

    return <FaIcon {...props} icon={icon} />;
  }
}

export default AppIcon;
