<script lang="ts">
import {defineComponent} from 'vue';
import uiHelper from '@/helpers/uiHelper';
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
      userData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  },
  methods: {
    async signUp() {
      const response = await this.userStore.signup(this.userData);

      if (response && response.message) {
        this.$router.push('/login');
        uiHelper.showMessage(response.message);
      }
    }
  }
});
</script>

<template>
  <div class="container page-container d-flex justify-content-center">
    <div class="col-xs-12 col-sm-6 col-sm-offset-3">
      <h1><span class="fa fa-sign-in" /> Signup</h1>

      <br />

      <FormValidate @submit="signUp">
        <div class="form-group">
          <label class="form-label" htmlFor="first-name">First Name</label>

          <Field
            type="text"
            id="first-name"
            name="firstName"
            class="form-control"
            placeholder="First Name"
            rules="required"
            v-model="userData.firstName"
          />

          <ErrorMessage name="firstName" class="help is-danger" />
        </div>

        <br />

        <div class="form-group">
          <label class="form-label" htmlFor="last-name">Last Name</label>

          <Field
            type="text"
            id="last-name"
            name="lastName"
            class="form-control"
            placeholder="Last Name"
            rules="required"
            v-model="userData.lastName"
          />

          <ErrorMessage name="lastName" class="help is-danger" />
        </div>

        <br />

        <div class="form-group">
          <label class="form-label" htmlFor="email">Email</label>

          <Field
            type="email"
            id="email"
            name="email"
            class="form-control"
            placeholder="Email"
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
            class="form-control"
            placeholder="Password"
            rules="required"
            v-model="userData.password"
          />

          <ErrorMessage name="password" class="help is-danger" />
        </div>

        <br />

        <div class="form-group">
          <label class="form-label" htmlFor="confirm-password">Confirm Password</label>

          <Field
            type="password"
            id="confirm-password"
            name="confirmPassword"
            class="form-control"
            placeholder="Confirm Password"
            rules="required|confirmed:@password"
            v-model="userData.confirmPassword"
          />

          <ErrorMessage name="confirmPassword" class="help is-danger" />
        </div>

        <br />

        <button type="submit" class="btn btn-warning btn-lg">Signup</button>
      </FormValidate>

      <hr />

      <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </div>
  </div>
</template>
