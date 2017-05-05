<template>
  <div id="app">
    <div class="overlay-style" v-if="isAjaxLoad"></div>

    <slot></slot>

    <router-view></router-view>
  </div>
</template>

<script src="./App.vue.js"></script>
