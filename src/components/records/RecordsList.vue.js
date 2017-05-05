import RecordRow from './RecordRow.vue';
import { mapGetters } from 'vuex';

export default {
  components: { RecordRow },
  name: 'RecordsList',
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
    records: 'records',
    categories: 'categories'
  }),
  created () {
    this.$store.dispatch('loadRecords');
    this.$store.dispatch('loadCategories');
  }
}
