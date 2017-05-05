import { mapGetters } from 'vuex';

export default {
  name: 'Navigation',
  created() {
    if (!this.user) {
      this.$store.dispatch('getCurrentUser');
    }
  },
  computed: {
    ...mapGetters({user: 'user'}),
    displayUserFullName() {
      if (!this.user) return '';

      if (this.user.profile && this.user.profile.local) {
        let local = this.user.profile.local;

        return `${local.firstName} ${local.lastName}`;
      }
    }
  },
  methods: {
    async logout() {
      this.$store.dispatch('logout');
    }
  }
}
