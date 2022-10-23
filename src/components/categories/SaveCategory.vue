<script lang="ts">
import {defineComponent} from 'vue';
import {Form as ValidateForm, Field, ErrorMessage} from 'vee-validate';

import ModalComponent from '@/components/common/ModalComponent.vue';

export default defineComponent({
  components: {ModalComponent, ValidateForm, Field, ErrorMessage},
  props: {
    categoryProps: {
      type: Object,
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
      category: this.categoryProps
    };
  },
  methods: {
    onSaveClick() {
      if (!this.category.title) {
        const titleElement = document.getElementById('category-title');
        if (titleElement) {
          titleElement.focus();
          titleElement.blur();
        }
      }

      if (!this.category.description) {
        const descriptionElement = document.getElementById('category-description');
        if (descriptionElement) {
          descriptionElement.focus();
          descriptionElement.blur();
        }
      }

      if (!this.category.title || !this.category.description) return;

      if (this.onSave) return this.onSave(this.category);
    },
    onCloseClick() {
      if (this.onClose) this.onClose();
    },
    submitForm() {}
  }
});
</script>

<template>
  <modal-component
    :visible="showModal"
    :title="title"
    :closeTitle="'Cancel'"
    :onClose="onCloseClick"
    :onSave="onSaveClick"
  >
    <template #body>
      <ValidateForm>
        <div class="form-group">
          <label class="form-label" for="category-title">Title</label>

          <Field
            type="text"
            class="form-control"
            id="category-title"
            placeholder="Title"
            name="title"
            rules="required"
            v-model="category.title"
          />

          <ErrorMessage name="title" class="help is-danger" />
        </div>

        <br />

        <div class="form-group">
          <label class="form-label" for="category-description">Description</label>

          <Field
            as="textarea"
            class="form-control"
            id="category-description"
            placeholder="Description"
            rows="4"
            name="description"
            rules="required"
            v-model="category.description"
          />

          <ErrorMessage name="description" class="help is-danger" />
        </div>
      </ValidateForm>
    </template>
  </modal-component>
</template>
