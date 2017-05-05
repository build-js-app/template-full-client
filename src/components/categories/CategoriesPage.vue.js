import toastr from 'toastr';

import CategoriesList from './CategoriesList.vue';
import SaveCategory from './SaveCategory.vue';
import Confirmation from '../common/Confirmation.vue';
import PageContent from '../common/PageContent.vue';

export default {
  name: 'CategoriesPage',
  components: { CategoriesList, SaveCategory, Confirmation, PageContent },
  data() {
    return {
      categoryToEdit: {
        title: '',
        description: ''
      },
      categoryToDeleteId: null,
      showModal: false
    }
  },
  computed: {
    title() {
      return this.categoryToEdit._id ? 'Edit Category' : 'Add New Category';
    },
    showConfirmation() {
      return !!this.categoryToDeleteId;
    }
  },
  methods: {
    addCategory() {
      this.categoryToEdit = Object.assign({}, {title: '', description: ''});
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    editCategory(category) {
      this.categoryToEdit = Object.assign({}, category);
      this.showModal = true;
    },
    saveCategory() {
      this.$store.dispatch('saveCategory', this.categoryToEdit);

      toastr.success(`Category was updated`);

      this.categoryToEdit = Object.assign({}, {title: '', description: ''});

      this.closeModal();
    },
    closeConfirmation() {
      this.categoryToDeleteId = null;
    },
    confirmDeleteCategory(id) {
      this.categoryToDeleteId = id;
    },
    deleteCategory() {
      this.$store.dispatch('deleteCategory', this.categoryToDeleteId);

      toastr.success('Category was deleted successfully!');

      this.closeConfirmation();
    }
  }
}
