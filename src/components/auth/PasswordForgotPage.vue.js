export default {
  name: 'PasswordForgotPage',
  data() {
    return {
      email: ''
    };
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator
        .validateAll()
        .then(result => {
          if (!result) return false;

          this.$store.dispatch('forgotPassword', this.email);
        })
        .catch(() => {
          return false;
        });
    }
  }
};
