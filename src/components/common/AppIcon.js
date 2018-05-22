import React, {Component} from 'react';
import PropTypes from 'prop-types';

import FaIcon from '@fortawesome/react-fontawesome';

//reduce bundle size by importing required icons only
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faSignInAlt from '@fortawesome/fontawesome-free-solid/faSignInAlt';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import faQuestionCircle from '@fortawesome/fontawesome-free-regular/faQuestionCircle';
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt';
import faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt';

const unknownIcon = faQuestionCircle;

let map = {
  plus: faPlus,
  delete: faTrashAlt,
  edit: faPencilAlt,
  'sign-out': faSignOutAlt,
  'sign-in': faSignInAlt
};

class AppIcon extends Component {
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
