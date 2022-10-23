import {format} from 'date-fns';

import config from '../../config/config.json';

export default {
  displayDate
};

function displayDate(date: string) {
  if (!date) return '-';

  return format(new Date(date), config.format.date);
}
