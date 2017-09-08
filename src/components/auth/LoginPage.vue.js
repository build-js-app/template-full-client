import {router} from '../../index';
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'LoginPage',
  data() {
    return {
      userData: {
        email: '',
        password: ''
      }
    };
  },
  computed: mapGetters({
    user: 'user'
  }),
  methods: {
    ...mapActions(['login']),

    validateBeforeSubmit() {
      this.$validator
        .validateAll()
        .then(result => {
          if (!result) return false;

          this.$store.dispatch('login', this.userData);
        })
        .catch(() => {
          return false;
        });
    }
  },
  created() {
    if (this.user) router.push('/records');
  },
  watch: {
    user: (val, oldValue) => {
      if (val) router.push('/records');
    }
  }
};
