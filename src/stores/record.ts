import {defineStore} from 'pinia';

import {useCommonStore} from '@/stores/common';

import dataService from '@/services/dataService';

interface RecordState {
  list: RecordItem[];
  sortBy: string;
}

export const useRecordStore = defineStore({
  id: 'record',
  state: (): RecordState => ({
    list: [],
    sortBy: 'date'
  }),
  actions: {
    async loadRecords() {
      const commonStore = useCommonStore();

      try {
        commonStore.beginAjaxCall();

        const records = await dataService.getRecords(this.sortBy);

        this.list = records;
      } catch (err) {
        console.log(err);
      } finally {
        commonStore.endAjaxCall();
      }
    },
    changeSortOrder(sortOrder: string) {
      this.sortBy = sortOrder;
      this.loadRecords();
    },
    async saveRecord(record: any) {
      const commonStore = useCommonStore();

      try {
        commonStore.beginAjaxCall();

        const response = await dataService.saveRecord(record);

        if (!response?.id) return null;

        this.loadRecords();

        return response;
      } catch (err) {
        console.log(err);
      } finally {
        commonStore.endAjaxCall();
      }
    },
    async deleteRecord(id: string) {
      const commonStore = useCommonStore();

      try {
        commonStore.beginAjaxCall();

        await dataService.deleteRecord(id);

        this.list = this.list.filter(record => {
          return record.id !== id;
        });
      } catch (err) {
        console.log(err);
      } finally {
        commonStore.endAjaxCall();
      }
    }
  }
});
