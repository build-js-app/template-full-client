type IconName = 'plus' | 'delete' | 'edit' | 'sign-out' | 'sign-in';

const map: Record<IconName, string> = {
  plus: 'bi-plus',
  delete: 'bi-trash3-fill',
  edit: 'bi-pencil-fill',
  'sign-out': 'bi-box-arrow-right',
  'sign-in': 'bi-box-arrow-in-right'
};

interface Props {
  icon: IconName;
  fontSize?: string;
  color?: string;
}

function AppIcon({icon, fontSize, color}: Props) {
  let iconName: string = '';

  if (map[icon]) {
    iconName = map[icon];
  }

  const style = {};
  if (fontSize) {
    style['fontSize'] = fontSize;
  }
  if (color) {
    style['color'] = color;
  }

  return <i className={`bi ${iconName}`} style={style} />;
}

export default AppIcon;
