export default {
  name: 'CategoryRow',
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
      if (this.onDelete) this.onDelete(this.category._id);
    }
  }
}
