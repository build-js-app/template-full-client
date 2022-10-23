<script lang="ts">
import {defineComponent} from 'vue';
import {useUserStore} from '@/stores/user';

import NavigationComponent from '@/components/NavigationComponent.vue';

export default defineComponent({
  components: {NavigationComponent},
  setup() {
    const userStore = useUserStore();
    return {userStore};
  }
});
</script>

<template>
  <div v-show="userStore.user">
    <navigation-component />

    <slot></slot>
  </div>
</template>
