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
  data() {
    return {
      email: ''
    };
  },
  methods: {
    resetPassword() {
      this.userStore.forgotPassword(this.email);
    }
  }
});
</script>

<template>
  <div class="container page-container d-flex justify-content-center">
    <div class="col-xs-12 col-sm-6 col-sm-offset-3">
      <h1>Reset Password</h1>

      <br />

      <FormValidate @submit="resetPassword">
        <div class="form-group">
          <label class="form-label" htmlFor="email">Email</label>

          <Field
            type="email"
            id="email"
            name="email"
            class="form-control"
            placeholder="Email"
            rules="required|email"
            v-model="email"
          />

          <ErrorMessage name="email" class="help is-danger" />
        </div>

        <br />

        <button type="submit" class="btn btn-warning btn-lg">Reset Password</button>
      </FormValidate>

      <hr />

      <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </div>
  </div>
</template>
