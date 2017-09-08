import {mapGetters} from 'vuex';

import Navigation from '../Navigation.vue';

export default {
  name: 'PageContent',
  components: {Navigation},
  computed: mapGetters({
    user: 'user'
  })
};
