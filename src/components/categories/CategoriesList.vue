<template>
  <div class="row" style="margin-top: 30px">
    <div class="col-sm-12" v-if="categories && categories.length">
      <div class="row item-row">
        <div class="col-sm-3 hidden-xs">
          <label>Title</label>
        </div>

        <div class="col-sm-3 hidden-xs">
          <label>Description</label>
        </div>

        <div class="col-sm-2 hidden-xs" />
        <div class="col-sm-2 hidden-xs" />
      </div>

      <category-row v-for="category in categories" :key="category.id" :category="category" :onEdit="onEdit" 
                    :onDelete="onDelete">
      </category-row>
    </div>

    <div v-else class="col-sm-12">
      No Categories.
    </div>
  </div>
</template>

<script src="./CategoriesList.vue.js"></script>
