import {format, parseISO} from 'date-fns';

import config from 'config';

export default {
  displayDate
};

function displayDate(date) {
  let num: any = 1;
  return format(parseISO(date, num), config.format.date);
}
