<script lang="ts">
import {defineComponent} from 'vue';
import uiHelper from '@/helpers/uiHelper';

import {useRecordStore} from '@/stores/record';

import FilterBar from '@/components/records/FilterBar.vue';
import RecordsList from '@/components/records/RecordsList.vue';
import SaveRecord from '@/components/records/SaveRecord.vue';
import ConfirmationComponent from '@/components/common/ConfirmationComponent.vue';
import PageContent from '@/components/common/PageContent.vue';

export default defineComponent({
  components: {FilterBar, RecordsList, SaveRecord, ConfirmationComponent, PageContent},
  setup() {
    const recordStore = useRecordStore();

    return {recordStore};
  },
  data() {
    return {
      recordToEdit: {
        id: null,
        cost: 0,
        date: null as Date | null,
        note: '',
        categoryId: null
      },
      recordToDeleteId: null as string | null,
      showModal: false
    };
  },
  computed: {
    title() {
      return this.recordToEdit.id ? 'Edit Record' : 'Add New Record';
    },
    showConfirmation() {
      return !!this.recordToDeleteId;
    }
  },
  methods: {
    addRecord() {
      this.recordToEdit.id = null;
      this.recordToEdit.cost = 0;
      this.recordToEdit.date = new Date();
      this.recordToEdit.note = '';
      this.recordToEdit.categoryId = null;

      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    editRecord(record: any) {
      this.recordToEdit.id = record.id;
      this.recordToEdit.cost = record.cost;
      this.recordToEdit.date = record.date;
      this.recordToEdit.note = record.note;
      this.recordToEdit.categoryId = record.categoryId;

      this.showModal = true;
    },
    async saveRecord() {
      const response = await this.recordStore.saveRecord(this.recordToEdit);

      if (response) {
        uiHelper.showMessage(`Record was updated`);

        this.recordToEdit.id = null;
        this.recordToEdit.cost = 0;
        this.recordToEdit.date = new Date();
        this.recordToEdit.note = '';
        this.recordToEdit.categoryId = null;

        this.closeModal();
      }
    },
    closeConfirmation() {
      this.recordToDeleteId = null;
    },
    confirmDeleteRecord(id: string) {
      this.recordToDeleteId = id;
    },
    async deleteRecord() {
      if (!this.recordToDeleteId) return;

      await this.recordStore.deleteRecord(this.recordToDeleteId);

      uiHelper.showMessage('Record was deleted successfully!');

      this.closeConfirmation();
    },
    sortChange(sortBy: string) {
      this.recordStore.changeSortOrder(sortBy);
    }
  }
});
</script>

<template>
  <page-content>
    <div class="container page-container">
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <div class="row">
            <div class="col-sm-12">
              <h2>Records Page</h2>
            </div>
          </div>

          <br />

          <filter-bar :sortBy="recordStore.sortBy" :onAddClick="addRecord" :onSortChange="sortChange" />

          <records-list :onEdit="editRecord" :onDelete="confirmDeleteRecord" />
        </div>
      </div>

      <save-record
        :recordProps="recordToEdit"
        :showModal="showModal"
        :title="title"
        :onClose="closeModal"
        :onSave="saveRecord"
      />

      <confirmation-component
        :visible="showConfirmation"
        :header="'Delete record'"
        :onClose="closeConfirmation"
        :onSave="deleteRecord"
      />
    </div>
  </page-content>
</template>
