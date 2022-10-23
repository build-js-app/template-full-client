<script lang="ts">
import {defineComponent} from 'vue';
import {Form as ValidateForm, Field, ErrorMessage} from 'vee-validate';

import {useCategoryStore} from '@/stores/category';

import ModalComponent from '@/components/common/ModalComponent.vue';

export default defineComponent({
  components: {ModalComponent, ValidateForm, Field, ErrorMessage},
  setup() {
    const categoryStore = useCategoryStore();

    return {categoryStore};
  },
  props: {
    recordProps: {
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
      record: this.recordProps
    };
  },
  methods: {
    onSaveClick() {
      if (!this.record.cost) {
        const costElement = document.getElementById('record-cost');
        if (costElement) {
          costElement.focus();
          costElement.blur();
        }
      }

      if (!this.record.categoryId) {
        const categoryElement = document.getElementById('record-category');
        if (categoryElement) {
          categoryElement.focus();
          categoryElement.blur();
        }
      }

      if (!this.record.note) {
        const noteElement = document.getElementById('record-note');
        if (noteElement) {
          noteElement.focus();
          noteElement.blur();
        }
      }

      if (!this.record.cost || !this.record.categoryId || !this.record.note) return;

      if (this.onSave) return this.onSave();
    },
    onCloseClick() {
      if (this.onClose) this.onClose();
    }
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
        <div class="form-group d-flex flex-column">
          <label class="form-label">Date</label>

          <el-date-picker v-model="record.date" type="date" placeholder="Pick a day" format="DD/MM/YYYY" />
        </div>

        <br />

        <div class="form-group">
          <label class="form-label" for="record-cost">Cost</label>

          <Field
            type="number"
            class="form-control"
            id="record-cost"
            placeholder="Cost"
            name="cost"
            rules="min_value:0.1"
            v-model="record.cost"
          />

          <ErrorMessage name="cost" class="help is-danger" />
        </div>

        <br />

        <div class="form-group">
          <label class="form-label" for="record-category">Category</label>

          <Field
            as="select"
            id="record-category"
            v-model="record.categoryId"
            class="form-control"
            name="category"
            placeholder="Select Category"
            rules="required"
          >
            <option v-for="category in categoryStore.list" :key="category.id" :value="category.id">
              {{ category.title }}
            </option>
          </Field>

          <ErrorMessage name="category" class="help is-danger" />
        </div>

        <br />

        <div class="form-group">
          <label class="form-label" for="record-note">Note</label>

          <Field
            as="textarea"
            class="form-control"
            id="record-note"
            placeholder="Note"
            rows="4"
            name="note"
            v-model="record.note"
            rules="required"
          />

          <ErrorMessage name="note" class="help is-danger" />
        </div>
      </ValidateForm>
    </template>
  </modal-component>
</template>
