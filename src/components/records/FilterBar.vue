<template>
  <div class="row">
    <div class="col-xs-1">
      <select v-model="sortOrder" class="form-control" v-on:change="sortChange()">
        <option v-for="sortOption in sortByOptions" :value="sortOption.value">{{sortOption.text}}</option>
      </select>
    </div>

    <div class="col-xs-10 text-right">
      <button type="button" class="btn btn-success" @click="addRecord()">
        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </button>
    </div>
  </div>
</template>

<script src="./FilterBar.vue.js"></script>
