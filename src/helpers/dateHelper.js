import {format, parseISO} from 'date-fns';

import config from 'helpers/configHelper';

export default {
  displayDate
};

function displayDate(date) {
  return format(parseISO(date, 1), config.format.date);
}
