<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  props: {
    sortBy: {
      type: String,
      required: true
    },
    onAddClick: {
      type: Function,
      required: true
    },
    onSortChange: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      sortOrder: '',
      sortByOptions: [
        {value: 'date', text: 'Date'},
        {value: 'categoryId', text: 'Category'},
        {value: 'cost', text: 'Cost'}
      ]
    };
  },
  created() {
    this.getSortOrder();
  },
  methods: {
    getSortOrder() {
      this.sortOrder = this.sortBy;
    },
    addRecord() {
      if (this.onAddClick) this.onAddClick();
    },
    sortChange() {
      if (this.onSortChange) this.onSortChange(this.sortOrder);
    }
  }
});
</script>

<template>
  <div class="row" id="filter-bar">
    <div class="col-sm-8" id="sort-btn">
      <label class="form-label">Sort by:</label>

      <select v-model="sortOrder" class="form-control" id="filter-select" v-on:change="sortChange()">
        <option v-for="sortOption in sortByOptions" v-bind:key="sortOption.value" :value="sortOption.value">
          {{ sortOption.text }}
        </option>
      </select>
    </div>

    <div class="col-sm-4 d-flex justify-content-end">
      <button type="button" class="btn btn-success" @click="addRecord()">
        <font-awesome-icon icon="fa-solid fa-plus" />
      </button>
    </div>
  </div>
</template>

<style scoped>
#filter-bar #sort-btn {
  display: flex;
  align-items: center;
}

#filter-bar #sort-btn label {
  margin-right: 8px;
}

#filter-bar #filter-select {
  width: auto;
}
</style>
