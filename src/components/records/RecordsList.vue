<template>
  <div class="table-responsive" v-if="records && records.length">
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Cost</th>
          <th>Note</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr is="record-row" v-for="record in records" :record="record" :categories="categories" :onEdit="onEdit" :onDelete="onDelete"></tr>
      </tbody>
    </table>
  </div>

  <div v-else class="message">
    No Records.
  </div>
</template>

<script src="./RecordsList.vue.js"></script>
