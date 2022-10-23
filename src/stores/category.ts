import {defineStore} from 'pinia';

import {useCommonStore} from '@/stores/common';

import uiHelper from '@/helpers/uiHelper';

import dataService from '@/services/dataService';

interface CategoryState {
  list: Category[];
}

export const useCategoryStore = defineStore({
  id: 'category',
  state: (): CategoryState => ({
    list: []
  }),
  actions: {
    async loadCategories() {
      const commonStore = useCommonStore();

      try {
        commonStore.beginAjaxCall();

        const categories = await dataService.getCategories();

        this.list = categories;
      } catch (err) {
        console.log(err);
      } finally {
        commonStore.endAjaxCall();
      }
    },
    async saveCategory(category: Category) {
      const commonStore = useCommonStore();

      try {
        commonStore.beginAjaxCall();

        const response = await dataService.saveCategory(category);

        if (!response?.id) return null;

        if (category.id) {
          this.list = this.list.map(cat => {
            return cat.id === category.id ? Object.assign(cat, category) : cat;
          });
        } else {
          this.list.push(response);
        }

        return response;
      } catch (err) {
        console.log(err);
      } finally {
        commonStore.endAjaxCall();
      }
    },
    async deleteCategory(id: string) {
      const commonStore = useCommonStore();

      try {
        commonStore.beginAjaxCall();

        const response = await dataService.deleteCategory(id);

        if (response) {
          this.list = this.list.filter(category => {
            return category.id !== id;
          });
          uiHelper.showMessage('Category was deleted successfully!');
        }
      } catch (err) {
        console.log(err);
      } finally {
        commonStore.endAjaxCall();
      }
    }
  }
});
