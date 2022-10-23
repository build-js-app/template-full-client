<script lang="ts">
import {defineComponent} from 'vue';
import uiHelper from '@/helpers/uiHelper';

import {useCategoryStore} from '@/stores/category';

import CategoriesList from '@/components/categories/CategoriesList.vue';
import SaveCategory from '@/components/categories/SaveCategory.vue';
import ConfirmationComponent from '@/components/common/ConfirmationComponent.vue';
import PageContent from '@/components/common/PageContent.vue';

export default defineComponent({
  components: {CategoriesList, SaveCategory, ConfirmationComponent, PageContent},
  setup() {
    const categoryStore = useCategoryStore();
    return {categoryStore};
  },
  data() {
    return {
      categoryToEdit: {
        id: null,
        title: '',
        description: ''
      },
      categoryToDeleteId: null as string | null,
      showModal: false
    };
  },
  computed: {
    title() {
      return this.categoryToEdit.id ? 'Edit Category' : 'Add New Category';
    },
    showConfirmation() {
      return !!this.categoryToDeleteId;
    }
  },
  methods: {
    addCategory() {
      this.categoryToEdit.id = null;
      this.categoryToEdit.title = '';
      this.categoryToEdit.description = '';
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    editCategory(category: any) {
      this.categoryToEdit.id = category.id;
      this.categoryToEdit.title = category.title;
      this.categoryToEdit.description = category.description;
      this.showModal = true;
    },
    async saveCategory(category: any) {
      const response = await this.categoryStore.saveCategory(category);

      if (response) {
        uiHelper.showMessage('Category was saved');

        this.categoryToEdit.id = null;
        this.categoryToEdit.title = '';
        this.categoryToEdit.description = '';

        this.closeModal();
      }
    },
    closeConfirmation() {
      this.categoryToDeleteId = null;
    },
    confirmDeleteCategory(id: string) {
      this.categoryToDeleteId = id;
    },
    async deleteCategory() {
      if (!this.categoryToDeleteId) return;

      await this.categoryStore.deleteCategory(this.categoryToDeleteId);

      this.closeConfirmation();
    }
  }
});
</script>

<template>
  <page-content>
    <div class="container page-container">
      <div class="row">
        <div class="col-sm-12 col-md-11 col-md-offset-1">
          <div class="row">
            <div class="col-sm-12">
              <h2>Categories Page</h2>
            </div>
          </div>

          <br />

          <div class="row">
            <div class="col-sm-12">
              <button type="button" class="btn btn-primary" @click="addCategory()">Add new category</button>
            </div>
          </div>

          <categories-list :onEdit="editCategory" :onDelete="confirmDeleteCategory" />
        </div>
      </div>

      <save-category
        :categoryProps="categoryToEdit"
        :showModal="showModal"
        :title="title"
        :onClose="closeModal"
        :onSave="saveCategory"
      />

      <confirmation-component
        :visible="showConfirmation"
        :header="'Delete category'"
        :onClose="closeConfirmation"
        :onSave="deleteCategory"
      />
    </div>
  </page-content>
</template>
