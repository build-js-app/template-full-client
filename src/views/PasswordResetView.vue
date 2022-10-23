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
        email: '',
        password: '',
        confirmPassword: '',
        token: ''
      }
    };
  },
  created() {
    this.checkResetToken();
  },
  methods: {
    async checkResetToken() {
      const token = this.$route.params.token as string;

      const data = await this.userStore.checkResetToken(token);

      if (data) {
        this.userData.email = data.email;
        this.userData.token = data.token;
      }
    },
    async resetPassword() {
      const response = await this.userStore.resetPassword(this.userData);

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
      <h1>Reset Password</h1>

      <br />

      <FormValidate @submit="resetPassword">
        <div class="form-group">
          <label class="form-label" htmlFor="email">Email</label>

          <div class="field">
            <input
              type="email"
              id="email"
              name="email"
              class="form-control"
              placeholder="Email"
              :value="userData.email"
              readonly
            />
          </div>
        </div>

        <br />

        <div class="form-group">
          <label class="form-label" htmlFor="password">New Password</label>

          <Field
            type="password"
            id="password"
            name="password"
            class="form-control"
            placeholder="New password"
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

        <button type="submit" class="btn btn-warning btn-lg">Save Password</button>
      </FormValidate>

      <hr />

      <p>Redirect to login page: <router-link to="/login">Login</router-link></p>
    </div>
  </div>
</template>
