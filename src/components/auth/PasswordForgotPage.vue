<template>
  <div class="container">
    <div class="col-xs-8 col-xs-offset-0 col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3">
      <h1>Reset Password</h1>

      <form @submit.prevent="validateBeforeSubmit" novalidate>
        <div class="form-group">
          <label htmlFor="email">Email</label>

          <div class="field">
            <input type="email" id="email" name="email" class="form-control" placeholder="Email"
                   v-validate:email="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }"
                   v-model="email" />

            <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
          </div>
        </div>

        <button type="submit" class="btn btn-warning btn-lg">Reset Password</button>
      </form>

      <hr />

      <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </div>
  </div>
</template>

<script src="./PasswordForgotPage.vue.js"></script>
