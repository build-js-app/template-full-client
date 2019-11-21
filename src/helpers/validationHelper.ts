import _ from 'lodash';

export default {
  isValidEmail,
  isEmptyErrorObject
};

const EMAIL_VALIDATION_REG_EXP = /^([\w-+]+(?:\.[\w-+]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

function isValidEmail(email: string) {
  return EMAIL_VALIDATION_REG_EXP.test(email);
}

function isEmptyErrorObject(obj) {
  let isEmptyObject = true;

  for (let key of Object.keys(obj)) {
    let value = obj[key];

    if (!_.isEmpty(value)) {
      isEmptyObject = false;
      break;
    }
  }

  return isEmptyObject;
}
