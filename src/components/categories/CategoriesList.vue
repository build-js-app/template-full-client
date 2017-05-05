<template>
  <div class="table-responsive" v-if="categories && categories.length">
    <table class="table table-bordered table-striped">
      <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th></th>
        <th></th>
      </tr>
      </thead>
      <tbody>
        <tr is="category-row" v-for="category in categories" :category="category" :onEdit="onEdit" :onDelete="onDelete"></tr>
      </tbody>
    </table>
  </div>

  <div v-else class="message">
    No Categories.
  </div>
</template>

<script src="./CategoriesList.vue.js"></script>
