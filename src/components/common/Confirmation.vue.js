import Modal from './Modal.vue';

export default {
  name: 'Confirmation',
  components: { Modal },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    header: {
      type: String
    },
    title: {
      type: String
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
      closeTitle: 'No',
      submitTitle: 'Yes',
      closeStyle: 'btn-danger'
    }
  },
  computed: {
    displayHeader() {
      return this.header ? this.header : 'Confirmation';
    },
    displayTitle() {
      return this.title ? this.title : 'Are you sure?';
    }
  }
}
