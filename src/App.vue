<script lang="ts">
import {defineComponent} from 'vue';
import {RouterView} from 'vue-router';

import {useCommonStore} from '@/stores/common';

export default defineComponent({
  components: {RouterView},
  setup() {
    const commonStore = useCommonStore();

    return {commonStore};
  }
});
</script>

<template>
  <div id="app">
    <div class="overlay-style" v-if="commonStore.isAjaxLoad"></div>

    <slot></slot>

    <router-view />
  </div>
</template>
