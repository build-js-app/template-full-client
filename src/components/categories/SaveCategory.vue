<template>
  <modal :visible="showModal" :title="title" :closeTitle="'Cancel'" :onClose="onCloseClick" :onSave="onSaveClick">
    <div slot="body">
      <div class="form-group">
        <label for="category-title">Title</label>

        <input type="text" class="form-control" id="category-title" placeholder="Title" name="title" v-model="category.title"
               :class="{'input': true, 'is-danger': errors.has('title') }" v-validate="'required'" />

        <span v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>
      </div>

      <div class="form-group">
        <label for="category-description">Description</label>

        <textarea class="form-control" id="category-description" placeholder="Description" rows="4" name="description"
                  :class="{'textarea': true, 'is-danger': errors.has('description') }" v-validate="'required'"
                  v-model="category.description">
        </textarea>

        <span v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</span>
      </div>
    </div>
  </modal>
</template>

<script src="./SaveCategory.vue.js"></script>
