<script lang="ts">
import {defineComponent} from 'vue';
import {useCategoryStore} from '@/stores/category';

import CategoryRow from '@/components/categories/CategoryRow.vue';

export default defineComponent({
  components: {CategoryRow},
  setup() {
    const categoryStore = useCategoryStore();
    return {categoryStore};
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
    this.categoryStore.loadCategories();
  }
});
</script>

<template>
  <div class="row" style="margin-top: 30px">
    <div class="col-sm-12" v-if="categoryStore.list && categoryStore.list.length">
      <div class="row item-row">
        <div class="col-sm-3 d-none d-sm-block">
          <label class="form-label">Title</label>
        </div>

        <div class="col-sm-3 d-none d-sm-block">
          <label class="form-label">Description</label>
        </div>

        <div class="col-sm-2 d-none d-sm-block" />
        <div class="col-sm-2 d-none d-sm-block" />
      </div>

      <category-row
        v-for="category in categoryStore.list"
        :key="category.id"
        :category="category"
        :onEdit="onEdit"
        :onDelete="onDelete"
      >
      </category-row>
    </div>

    <div v-else class="col-sm-12">No Categories.</div>
  </div>
</template>
