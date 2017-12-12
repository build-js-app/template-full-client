<template>
  <div class="container">
    <div class="col-xs-12 col-sm-6 col-sm-offset-3">
      <h1>Reset Password</h1>

      <form @submit.prevent="validateBeforeSubmit" novalidate>
        <div class="form-group">
          <label htmlFor="email">Email</label>

          <div class="field">
            <input type="email" id="email" name="email" class="form-control" placeholder="Email" :value="userData.email" readonly />
          </div>
        </div>

        <div class="form-group">
          <label htmlFor="password">New Password</label>

          <div class="field">
            <input type="password" id="password" name="password" class="form-control" placeholder="New password"
                   v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('password') }"
                   v-model="userData.password" />

            <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
          </div>
        </div>

        <div class="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>

          <div class="field">
            <input type="password" id="confirm-password" name="confirmPassword" class="form-control" placeholder="Confirm Password"
                   v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('confirmPassword') }"
                   v-model="userData.confirmPassword" />

            <span v-show="errors.has('confirmPassword')" class="help is-danger">{{ errors.first('confirmPassword') }}</span>
          </div>
        </div>

        <button type="submit" class="btn btn-warning btn-lg">Save Password</button>
      </form>

      <hr />

      <p>Redirect to login page: <router-link to="/login">Login</router-link></p>
    </div>
  </div>
</template>

<script src="./PasswordResetPage.vue.js"></script>
