import React from 'react';
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

AppIcon.propTypes = {
  icon: PropTypes.string.isRequired
};

function AppIcon(props) {
  let icon = unknownIcon;

  if (map[props.icon]) {
    icon = map[props.icon];
  }

  return <FaIcon {...props} icon={icon} />;
}

export default AppIcon;
