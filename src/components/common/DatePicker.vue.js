import Flatpickr from 'flatpickr';

export default {
  props: {
    inputClass: {
      type: String
    },
    placeholder: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => ({})
    },
    plugins: {
      type: Array,
      default: () => []
    },
    value: {
      type: Date,
      default: null
    },
    onChange: {
      type: Function
    }
  },
  data() {
    return {
      fp: null
    };
  },
  computed: {
    fpOptions() {
      return JSON.stringify(this.options);
    }
  },
  watch: {
    fpOptions(newOpt) {
      const option = JSON.parse(newOpt);

      for (let o of option) {
        this.fp.set(o, option[o]);
      }
    },
    value(newVal) {
      this.fp.setDate(newVal);
    }
  },
  mounted() {
    let onChangeHandler = value => {
      if (this.onChange) {
        this.onChange(value);
      }
    };

    let onInputHandler = value => {
      this.$emit('input', value);
    };

    this.fp = new Flatpickr(
      this.$el,
      Object.assign(
        this.options,
        {plugins: this.plugins},
        {
          onChange(value) {
            var newVal = value[0];
            onInputHandler(newVal);
            onChangeHandler(newVal);
          }
        }
      )
    );

    this.fp.setDate(this.value);
  },
  destroyed() {
    this.fp.destroy();
    this.fp = null;
  }
};
