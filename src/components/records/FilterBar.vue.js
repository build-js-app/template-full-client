export default {
  name: 'FilterBar',
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
};
