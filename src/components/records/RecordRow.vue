<script lang="ts">
import {defineComponent} from 'vue';

import dateHelper from '@/helpers/dateHelper';

export default defineComponent({
  props: {
    record: {
      type: Object,
      required: true
    },
    categories: {
      type: Array,
      required: true
    },
    onEdit: {
      type: Function,
      required: true
    },
    onDelete: {
      type: Function,
      required: true
    }
  },
  computed: {
    dateDisplay() {
      return dateHelper.displayDate(this.record.date);
    },
    category() {
      const category: any = this.categories.find((cat: any) => {
        return cat.id === this.record.categoryId;
      });

      return category ? category.title : '';
    }
  },
  methods: {
    edit() {
      if (this.onEdit) this.onEdit(this.record);
    },
    deleteRecord() {
      if (this.onDelete) this.onDelete(this.record.id);
    }
  }
});
</script>

<template>
  <div class="row item-row">
    <div class="col-sm-2 d-none d-sm-block">{{ dateDisplay }}</div>

    <div class="col-xs-12 d-block d-sm-none">
      <div class="row">
        <div class="col-xs-12">
          <label class="form-label">Date:</label>
        </div>
        <div class="col-xs-12 form-group">
          {{ dateDisplay }}
        </div>
      </div>
    </div>

    <div class="col-sm-3 d-none d-sm-block">{{ category }}</div>

    <div class="col-xs-12 d-block d-sm-none">
      <div class="row">
        <div class="col-xs-12">
          <label class="form-label">Category:</label>
        </div>
        <div class="col-xs-12 form-group">
          {{ category }}
        </div>
      </div>
    </div>

    <div class="col-sm-2 d-none d-sm-block">{{ record.cost }}</div>

    <div class="col-xs-12 d-block d-sm-none">
      <div class="row">
        <div class="col-xs-12">
          <label class="form-label">Cost:</label>
        </div>
        <div class="col-xs-12 form-group">
          {{ record.cost }}
        </div>
      </div>
    </div>

    <div class="col-sm-3 d-none d-sm-block">{{ record.note }}</div>

    <div class="col-xs-12 d-block d-sm-none">
      <div class="row">
        <div class="col-xs-12">
          <label class="form-label">Note:</label>
        </div>
        <div class="col-xs-12 form-group">
          {{ record.note }}
        </div>
      </div>
    </div>

    <div class="col-sm-1 col-xs-3">
      <a href="#" @click="edit()">Edit</a>
    </div>

    <div class="col-sm-1 col-xs-3">
      <a href="#" @click="deleteRecord()">Delete</a>
    </div>
  </div>
</template>
