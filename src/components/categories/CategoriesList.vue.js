import {mapGetters} from 'vuex';

import CategoryRow from './CategoryRow.vue';

export default {
  components: {CategoryRow},
  name: 'CategoriesList',
  props: {
    onEdit: {
      type: Function,
      required: true
    },
    onDelete: {
      type: Function,
      required: true
    }
  },
  computed: mapGetters({
    categories: 'categories'
  }),
  created() {
    this.$store.dispatch('loadCategories');
  }
};
