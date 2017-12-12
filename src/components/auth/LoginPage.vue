<template>
  <div class="container">
    <div class="col-xs-12 col-sm-6 col-sm-offset-3">
      <h1><span class="fa fa-sign-in" /> Login</h1>

      <form @submit.prevent="validateBeforeSubmit" novalidate>
        <div class="form-group">
          <label htmlFor="email">Email</label>

          <div class="field">
            <input type="email" id="email" name="email" class="form-control" placeholder="Email"
                   v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }"
                   v-model="userData.email" />

            <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
          </div>
        </div>

        <div class="form-group">
          <label htmlFor="password">Password</label>

          <div class="field">
            <input type="password" id="password" name="password" class="form-control" placeholder="Password"
                   v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('password') }"
                   v-model="userData.password" />

            <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
          </div>
        </div>

        <button type="submit" class="btn btn-warning btn-lg">Login</button>
      </form>

      <hr />

      <router-link to="/password-forgot">Forgot your password?</router-link>

      <hr />

      <p>Need an account? <router-link to="/signup">Signup</router-link></p>
    </div>
  </div>
</template>

<script src="./LoginPage.vue.js"></script>
