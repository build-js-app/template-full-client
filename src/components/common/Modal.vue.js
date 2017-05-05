export default {
  name: 'Modal',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    saveTitle: {
      type: String
    },
    closeTitle: {
      type: String
    },
    closeStyle: {
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
  computed: {
    classObject() {
      return { show: this.visible, 'in': this.visible}
    },
    saveBtn() {
      return this.saveTitle ? this.saveTitle : 'Save';
    },
    closeBtn() {
      return this.closeTitle ? this.closeTitle : 'Close';
    },
    closeBtnStyle() {
      return this.closeStyle ? this.closeStyle : 'btn-primary';
    }
  },
  methods: {
    close() {
      if(this.onClose) this.onClose();
    },
    save() {
      if(this.onSave) this.onSave();
    }
  }
}
