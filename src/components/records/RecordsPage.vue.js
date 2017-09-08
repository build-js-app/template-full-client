import toastr from 'toastr';

import {mapGetters} from 'vuex';
import FilterBar from './FilterBar.vue';
import RecordsList from './RecordsList.vue';
import SaveRecord from './SaveRecord.vue';
import Confirmation from '../common/Confirmation.vue';
import PageContent from '../common/PageContent.vue';

export default {
  components: {FilterBar, RecordsList, SaveRecord, Confirmation, PageContent},
  name: 'RecordsPage',
  data() {
    return {
      recordToEdit: {
        cost: 0,
        date: null,
        note: '',
        categoryId: null
      },
      recordToDeleteId: null,
      showModal: false
    };
  },
  computed: {
    ...mapGetters({
      sortBy: 'sortBy',
      categories: 'categories'
    }),
    title() {
      return this.recordToEdit.id ? 'Edit Record' : 'Add New Record';
    },
    showConfirmation() {
      return !!this.recordToDeleteId;
    }
  },
  methods: {
    addRecord() {
      this.recordToEdit = Object.assign({}, {cost: 0, date: new Date(), note: '', categoryId: null});
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    editRecord(record) {
      this.recordToEdit = Object.assign({}, record);
      this.showModal = true;
    },
    saveRecord() {
      this.$store.dispatch('saveRecord', this.recordToEdit);

      toastr.success(`Record was updated`);

      this.recordToEdit = Object.assign({}, {cost: 0, date: new Date(), note: '', categoryId: null});

      this.closeModal();
    },
    closeConfirmation() {
      this.recordToDeleteId = null;
    },
    confirmDeleteRecord(id) {
      this.recordToDeleteId = id;
    },
    deleteRecord() {
      this.$store.dispatch('deleteRecord', this.recordToDeleteId);

      toastr.success('Record was deleted successfully!');

      this.closeConfirmation();
    },
    sortChange(sortBy) {
      this.$store.dispatch('changeSortOrder', sortBy);
    }
  }
};
