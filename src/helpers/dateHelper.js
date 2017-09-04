import * as dateFns from 'date-fns';

let config = require('../config/config.json');

export default {
  displayDate
};

function displayDate(date) {
  return dateFns.format(date, config.format.date);
}
