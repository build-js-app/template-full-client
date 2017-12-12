<template>
  <div class="row item-row">
    <div class="col-sm-3 hidden-xs">{{category.title}}</div>

    <div class="col-xs-12 hidden-sm hidden-md hidden-lg">
      <div class="row">
        <div class="col-xs-12">
          <label>Title:</label>
        </div>
        <div class="col-xs-12 form-group">
          {{category.title}}
        </div>
      </div>
    </div>

    <div class="col-sm-3 hidden-xs">{{category.description}}</div>

    <div class="col-xs-12 hidden-sm hidden-md hidden-lg">
      <div class="row">
        <div class="col-xs-12">
          <label>Description:</label>
        </div>
        <div class="col-xs-12 form-group">
          {{category.description}}
        </div>
      </div>
    </div>

    <div class="col-sm-1 col-xs-3">
      <a href="#" @click="edit()">Edit</a>
    </div>

    <div class="col-sm-1 col-xs-3">
      <a href="#" @click="deleteCategory()">Delete</a>
    </div>
  </div>
</template>

<script src="./CategoryRow.vue.js"></script>
