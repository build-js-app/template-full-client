import {defineStore} from 'pinia';

export const useCommonStore = defineStore({
  id: 'common',
  state: () => ({
    isAjaxLoad: false
  }),
  actions: {
    beginAjaxCall() {
      this.isAjaxLoad = true;
    },
    endAjaxCall() {
      this.isAjaxLoad = false;
    }
  }
});
