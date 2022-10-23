<script lang="ts">
import {defineComponent} from 'vue';
import {Form as FormValidate, Field, ErrorMessage} from 'vee-validate';

import {useUserStore} from '@/stores/user';

export default defineComponent({
  components: {FormValidate, Field, ErrorMessage},
  setup() {
    const userStore = useUserStore();
    return {userStore};
  },
  created() {
    if (this.userStore.user) this.$router.push('/records');
  },
  watch: {
    'userStore.user'() {
      if (this.userStore.user) this.$router.push('/records');
    }
  },
  data() {
    return {
      userData: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    handleLogin(values: any) {
      this.userStore.login(values);
    }
  }
});
</script>

<template>
  <div class="container page-container d-flex justify-content-center">
    <div class="col-xs-12 col-sm-6 col-sm-offset-3">
      <h1><span class="fa fa-sign-in" /> Login</h1>

      <br />

      <FormValidate @submit="handleLogin">
        <div class="form-group">
          <label class="form-label" htmlFor="email">Email</label>

          <Field
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            class="form-control"
            rules="required|email"
            v-model="userData.email"
          />

          <ErrorMessage name="email" class="help is-danger" />
        </div>

        <br />

        <div class="form-group">
          <label class="form-label" htmlFor="password">Password</label>

          <Field
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            class="form-control"
            rules="required"
            v-model="userData.password"
          />

          <ErrorMessage name="password" class="help is-danger" />
        </div>

        <br />

        <button type="submit" class="btn btn-warning btn-lg">Login</button>
      </FormValidate>

      <hr />

      <router-link to="/password-forgot">Forgot your password?</router-link>

      <hr />

      <p>Need an account? <router-link to="/signup">Signup</router-link></p>
    </div>
  </div>
</template>
