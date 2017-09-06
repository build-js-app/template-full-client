export default {
  name: 'PasswordResetPage',
  data() {
    return {
      userData: {
        email: '',
        password: '',
        confirmPassword: '',
        token: ''
      }
    }
  },
  created() {
    this.checkResetToken();
  },
  methods: {
    async checkResetToken() {
      let token = this.$route.params.token;

      let data = await this.$store.dispatch('checkResetToken', token);

      if (data) {
        this.userData.email = data.email;
        this.userData.token = data.token;
      }
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (!result) return false;

        this.$store.dispatch('resetPassword', this.userData);
      }).catch(() => {
        return false;
      });
    }
  }
}
