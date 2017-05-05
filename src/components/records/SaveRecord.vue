<template>
  <modal :visible="showModal" :title="title" :closeTitle="'Cancel'" :onClose="onCloseClick" :onSave="onSaveClick">
    <div slot="body">
      <div class="form-group">
        <label>Date</label>

        <date-picker v-model="record.date" :options="dateOptions"></date-picker>
      </div>

      <div class="form-group">
        <label for="record-title">Cost</label>

        <input type="number" class="form-control" id="record-title" placeholder="Cost" name="cost"
               :class="{'input': true, 'is-danger': errors.has('cost') }" v-validate="'required|min_value:0.01'" v-model="record.cost" />

        <span v-show="errors.has('cost')" class="help is-danger">{{ errors.first('cost') }}</span>
      </div>

      <div class="form-group">
        <label>Category</label>

        <select v-model="record.categoryId" class="form-control" name="category"
                :class="{'select': true, 'is-danger': errors.has('category') }" v-validate="'required'">
          <option v-for="category in categories" :value="category._id">{{category.title}}</option>
        </select>

        <span v-show="errors.has('category')" class="help is-danger">{{ errors.first('category') }}</span>
      </div>

      <div class="form-group">
        <label for="record-note">Note</label>

        <textarea class="form-control" id="record-note" placeholder="Note" rows="4" name="note"
                  :class="{'textarea': true, 'is-danger': errors.has('note') }" v-validate="'required'"
                  v-model="record.note">
        </textarea>

        <span v-show="errors.has('note')" class="help is-danger">{{ errors.first('note') }}</span>
      </div>
    </div>
  </modal>
</template>

<script src="./SaveRecord.vue.js"></script>
