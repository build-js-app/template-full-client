<template>
  <div class="row" id="filter-bar">
    <div class="col-xs-8" id="sort-btn">
      <label>Sort by:</label>

      <select v-model="sortOrder" class="form-control" id="filter-select" v-on:change="sortChange()">
        <option v-for="sortOption in sortByOptions" v-bind:key="sortOption.value" :value="sortOption.value">
          {{sortOption.text}}
        </option>
      </select>
    </div>

    <div class="col-xs-4 text-right">
      <button type="button" class="btn btn-success" @click="addRecord()">
        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </button>
    </div>
  </div>
</template>

<script src="./FilterBar.vue.js"></script>
