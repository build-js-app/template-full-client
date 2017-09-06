import { mapGetters } from 'vuex';

export default {
  name: 'LoginPage',
  data() {
    return {
      userData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  computed: mapGetters({
    user: 'user'
  }),
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (!result) return false;

        this.$store.dispatch('signup', this.userData);
      }).catch(() => {
        return false;
      });
    }
  }
}
