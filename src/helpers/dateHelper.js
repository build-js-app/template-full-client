import * as dateFns from 'date-fns';

import config from 'helpers/configHelper';

export default {
  displayDate
};

function displayDate(date) {
  return dateFns.format(date, config.format.date);
}
