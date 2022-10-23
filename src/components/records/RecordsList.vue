<script lang="ts">
import {defineComponent} from 'vue';
import {useCategoryStore} from '@/stores/category';
import {useRecordStore} from '@/stores/record';

import RecordRow from '@/components/records/RecordRow.vue';

export default defineComponent({
  components: {RecordRow},
  setup() {
    const categoryStore = useCategoryStore();
    const recordStore = useRecordStore();

    return {categoryStore, recordStore};
  },
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
  created() {
    this.recordStore.loadRecords();
    this.categoryStore.loadCategories();
  }
});
</script>

<template>
  <div class="row" style="margin-top: 30px">
    <div class="col-sm-12" v-if="recordStore.list && recordStore.list.length">
      <div class="row item-row">
        <div class="col-sm-2 d-none d-sm-block">
          <label class="form-label">Date</label>
        </div>

        <div class="col-sm-3 d-none d-sm-block">
          <label class="form-label">Category</label>
        </div>

        <div class="col-sm-2 d-none d-sm-block">
          <label class="form-label">Cost</label>
        </div>

        <div class="col-sm-3 d-none d-sm-block">
          <label class="form-label">Note</label>
        </div>

        <div class="col-sm-2 d-none d-sm-block" />
        <div class="col-sm-2 d-none d-sm-block" />
      </div>

      <record-row
        v-for="record in recordStore.list"
        :key="record.id"
        :record="record"
        :categories="categoryStore.list"
        :onEdit="onEdit"
        :onDelete="onDelete"
      >
      </record-row>
    </div>

    <div v-else class="col-sm-12">No Records.</div>
  </div>
</template>
