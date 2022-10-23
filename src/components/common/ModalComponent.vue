<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
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
      if (this.onClose) this.onClose();
    },
    save() {
      if (this.onSave) this.onSave();
    }
  }
});
</script>

<template>
  <div v-if="visible" class="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style="display: block">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close()" />
        </div>

        <div class="modal-body">
          <slot name="body">Default body</slot>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn" v-bind:class="[closeBtnStyle]" @click="save()">{{ saveBtn }}</button>

          <button type="button" class="btn btn-default" @click="close()">{{ closeBtn }}</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->
</template>

<style>
.modal {
  z-index: 1;
}
</style>
