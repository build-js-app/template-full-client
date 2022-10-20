import {faQuestionCircle} from '@fortawesome/free-regular-svg-icons';
//reduce bundle size by importing required icons only
import {faPencilAlt, faPlus, faSignInAlt, faSignOutAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon as FaIcon} from '@fortawesome/react-fontawesome';

const unknownIcon = faQuestionCircle;

const map = {
  plus: faPlus,
  delete: faTrashAlt,
  edit: faPencilAlt,
  'sign-out': faSignOutAlt,
  'sign-in': faSignInAlt
};

interface Props {
  icon: string;
}

function AppIcon(props: Props) {
  let icon = unknownIcon;

  if (map[props.icon]) {
    icon = map[props.icon];
  }

  return <FaIcon {...props} icon={icon} />;
}

export default AppIcon;
