import Modal from '../common/Modal.vue';
import DatePicker from '../common/DatePicker.vue';

let config = require('../../../config/config.json');

export default {
  name: 'SaveRecord',
  components: { Modal, DatePicker },
  props: {
    record: {
      type: Object
    },
    categories: {
      type: Array,
      required: true
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
  data() {
    return {
      dateOptions: {
        dateFormat: config.format.datePicker
      }
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
