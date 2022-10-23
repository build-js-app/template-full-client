<script lang="ts">
import {defineComponent} from 'vue';
import {useUserStore} from '@/stores/user';

export default defineComponent({
  setup() {
    const userStore = useUserStore();

    return {userStore};
  },
  created() {
    if (!this.userStore.user) {
      this.userStore.getCurrentUser();
    }
  },
  computed: {
    displayUserFullName() {
      const user = this.userStore.user;

      if (!user) return '';

      if (user.profile && user.profile.local) {
        const local = user.profile.local;

        return `${local.firstName} ${local.lastName}`;
      }

      return '';
    }
  },
  methods: {
    async logout() {
      await this.userStore.logout();
      this.$router.push('/login');
    }
  }
});
</script>

<template>
  <nav class="navbar navbar-light navbar-expand-lg" style="background-color: #e3f2fd" v-if="userStore.user">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Expanse Manager</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/records" class="nav-link">Records</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/categories" class="nav-link">Categories</router-link>
          </li>
        </ul>

        <ul class="nav navbar-nav navbar-right">
          <span class="navbar-text me-3">
            Logged as: <b>{{ displayUserFullName }}</b>
          </span>

          <li class="nav-item">
            <a href="#" class="nav-link" @click="logout()">LogOut</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
.router-link-active {
  color: rgba(0, 0, 0, 0.9);
}
</style>
