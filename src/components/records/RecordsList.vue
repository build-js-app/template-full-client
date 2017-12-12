<template>
  <div class="row" style="margin-top: 30px">
    <div class="col-sm-12" v-if="records && records.length">
      <div class="row item-row">
        <div class="col-sm-2 hidden-xs">
          <label>Date</label>
        </div>

        <div class="col-sm-2 hidden-xs">
          <label>Category</label>
        </div>

        <div class="col-sm-1 hidden-xs">
          <label>Cost</label>
        </div>

        <div class="col-sm-3 hidden-xs">
          <label>Note</label>
        </div>

        <div class="col-sm-2 hidden-xs" />
        <div class="col-sm-2 hidden-xs" />
      </div>

      <record-row v-for="record in records" :key="record.id" :record="record" :categories="categories" :onEdit="onEdit" 
                  :onDelete="onDelete">
      </record-row>
    </div>

    <div v-else class="col-sm-12">
      No Records.
    </div>
  </div>
</template>

<script src="./RecordsList.vue.js"></script>
