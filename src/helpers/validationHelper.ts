export default {
  isValidEmail
};

const EMAIL_VALIDATION_REG_EXP = /^([\w-+]+(?:\.[\w-+]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

function isValidEmail(email: string) {
  return EMAIL_VALIDATION_REG_EXP.test(email);
}
