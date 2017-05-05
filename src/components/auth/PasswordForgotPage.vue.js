export default {
  name: 'PasswordForgotPage',
  data() {
    return {
      email: ''
    }
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(() => {
        this.$store.dispatch('forgotPassword', this.email);
      }).catch(() => {
        return false;
      });
    }
  }
}
