import {format, parseISO} from 'date-fns';

import config from './configHelper';

export default {
  displayDate
};

function displayDate(date: any) {
  let num: any = 1;
  return format(parseISO(date, num), config.format.date);
}
