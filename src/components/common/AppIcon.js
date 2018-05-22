import React from 'react';

import FaIcon from '@fortawesome/react-fontawesome';

//reduce bundle size by importing required icons only
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faSignInAlt from '@fortawesome/fontawesome-free-solid/faSignInAlt';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';
import faQuestionCircle from '@fortawesome/fontawesome-free-regular/faQuestionCircle';
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt';
import faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt';

const unknownIcon = faQuestionCircle;

let map = {
  plus: faPlus,
  user: faUser,
  delete: faTrashAlt,
  edit: faPencilAlt,
  'sign-out': faSignOutAlt,
  'sign-in': faSignInAlt
};

let AppIcon = props => {
  let icon = unknownIcon;
  if (map[props.icon]) {
    icon = map[props.icon];
  }
  return <FaIcon {...props} icon={icon} />;
};

export default AppIcon;
