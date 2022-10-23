<script lang="ts">
import {defineComponent} from 'vue';
import {useUserStore} from '@/stores/user';

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    return {userStore};
  },
  data() {
    return {
      activationData: {
        message: '',
        status: ''
      }
    };
  },
  created() {
    this.activateUserAccount();
  },
  computed: {
    alertClass() {
      const status = this.activationData.status;

      return {
        alert: true,
        'alert-danger': status === 'error',
        'alert-warning': status === 'warning',
        'alert-success': status === 'success'
      };
    }
  },
  methods: {
    async activateUserAccount() {
      const token = this.$route.params.token as string;

      const data = await this.userStore.activateUserAccount(token);

      if (data) {
        this.activationData = Object.assign({}, data);
      }
    }
  }
});
</script>

<template>
  <div class="container page-container d-flex justify-content-center">
    <div class="col-xs-12 col-sm-6 col-sm-offset-3">
      <h1>Activation Page</h1>

      <br />

      <div v-if="activationData.message" v-bind:class="alertClass">{{ activationData.message }}</div>

      <hr />

      <p>Redirect to login page: <router-link to="/login">Login</router-link></p>
    </div>
  </div>
</template>
