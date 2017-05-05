import Modal from '../common/Modal.vue';

export default {
  name: 'SaveCategory',
  components: { Modal },
  props: {
    category: {
      type: Object
    },
    showModal: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    onClose: {
      type: Function,
      required: true
    },
    onSave: {
      type: Function,
      required: true
    }
  },
  methods: {
    onSaveClick() {
      this.$validator.validateAll().then(() => {
        if (this.onSave) return this.onSave();
      }).catch(() => {
        return false;
      });
    },
    onCloseClick() {
      this.errors.clear();

      if (this.onClose) this.onClose();
    }
  }
}
