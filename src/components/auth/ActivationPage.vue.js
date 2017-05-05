export default {
  name: 'ActivationPage',
  data() {
    return {
      activationData: {
        message: '',
        status: ''
      }
    }
  },
  created() {
    this.activateUserAccount();
  },
  computed: {
    alertClass() {
      let status = this.activationData.status;

      return {
        alert: true,
        'alert-danger': status === 'error',
        'alert-warning': status === 'warning',
        'alert-success': status === 'success'
      }
    }
  },
  methods: {
    async activateUserAccount() {
      let token = this.$route.params.token;

      let data = await this.$store.dispatch('activateUserAccount', token);

      if (data) {
        this.activationData = Object.assign({}, data);
      }
    }
  }
}
