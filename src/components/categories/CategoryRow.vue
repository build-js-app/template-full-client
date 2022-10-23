<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  props: {
    category: {
      type: Object,
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
  methods: {
    edit() {
      if (this.onEdit) this.onEdit(this.category);
    },
    deleteCategory() {
      if (this.onDelete) this.onDelete(this.category.id);
    }
  }
});
</script>

<template>
  <div class="row item-row">
    <div class="col-sm-3 d-none d-sm-block">{{ category.title }}</div>

    <div class="col-xs-12 d-block d-sm-none">
      <div class="row">
        <div class="col-xs-12">
          <label class="form-label">Title:</label>
        </div>
        <div class="col-xs-12 form-group">
          {{ category.title }}
        </div>
      </div>
    </div>

    <div class="col-sm-3 d-none d-sm-block">{{ category.description }}</div>

    <div class="col-xs-12 d-block d-sm-none">
      <div class="row">
        <div class="col-xs-12">
          <label class="form-label">Description:</label>
        </div>
        <div class="col-xs-12 form-group">
          {{ category.description }}
        </div>
      </div>
    </div>

    <div class="col-sm-1 col-xs-3">
      <a href="#" @click="edit()">Edit</a>
    </div>

    <div class="col-sm-1 col-xs-3">
      <a href="#" @click="deleteCategory()">Delete</a>
    </div>
  </div>
</template>
