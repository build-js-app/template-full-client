import dateHelper from '../../helpers/dateHelper';
import * as _ from 'lodash';

export default {
  name: 'RecordRow',
  props: {
    record: {
      type: Object
    },
    categories: {
      type: Array
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
    dateDisplay () {
      return dateHelper.displayDate(this.record.date);
    },
    category() {
      let category = _.find(this.categories, (category) => {
        return category._id === this.record.categoryId;
      });

      return category ? category.title : '';
    }
  },
  methods: {
    edit() {
      if (this.onEdit) this.onEdit(this.record);
    },
    deleteRecord() {
      if (this.onDelete) this.onDelete(this.record._id);
    }
  }
}
