<script lang="ts">
import {defineComponent} from 'vue';
import Modal from '@/components/common/ModalComponent.vue';

export default defineComponent({
  components: {Modal},
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
    };
  },
  computed: {
    displayHeader() {
      return this.header ? this.header : 'Confirmation';
    },
    displayTitle() {
      return this.title ? this.title : 'Are you sure?';
    }
  }
});
</script>

<template>
  <modal
    :visible="visible"
    :title="displayHeader"
    :closeTitle="closeTitle"
    :closeStyle="closeStyle"
    :saveTitle="submitTitle"
    :onClose="onClose"
    :onSave="onSave"
  >
    <template #body>
      <h4>{{ displayTitle }}</h4>
    </template>
  </modal>
</template>
