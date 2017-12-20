<template>
  <div class="row item-row">
    <div class="col-sm-2 hidden-xs">{{dateDisplay}}</div>

    <div class="col-xs-12 hidden-sm hidden-md hidden-lg">
      <div class="row">
        <div class="col-xs-12">
          <label>Date:</label>
        </div>
        <div class="col-xs-12 form-group">
          {{dateDisplay}}
        </div>
      </div>
    </div>

    <div class="col-sm-3 hidden-xs">{{category}}</div>

    <div class="col-xs-12 hidden-sm hidden-md hidden-lg">
      <div class="row">
        <div class="col-xs-12">
          <label>Category:</label>
        </div>
        <div class="col-xs-12 form-group">
          {{category}}
        </div>
      </div>
    </div>

    <div class="col-sm-2 hidden-xs">{{record.cost}}</div>

    <div class="col-xs-12 hidden-sm hidden-md hidden-lg">
      <div class="row">
        <div class="col-xs-12">
          <label>Cost:</label>
        </div>
        <div class="col-xs-12 form-group">
          {{record.cost}}
        </div>
      </div>
    </div>

    <div class="col-sm-3 hidden-xs">{{record.note}}</div>

    <div class="col-xs-12 hidden-sm hidden-md hidden-lg">
      <div class="row">
        <div class="col-xs-12">
          <label>Note:</label>
        </div>
        <div class="col-xs-12 form-group">
          {{record.note}}
        </div>
      </div>
    </div>

    <div class="col-sm-1 col-xs-3">
      <a href="#" @click="edit()">Edit</a>
    </div>

    <div class="col-sm-1 col-xs-3">
      <a href="#" @click="deleteRecord()">Delete</a>
    </div>
  </div>
</template>

<script src="./RecordRow.vue.js"></script>
