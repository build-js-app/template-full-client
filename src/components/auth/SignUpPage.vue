<template>
  <div class="container">
    <div class="col-xs-8 col-xs-offset-0 col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3">
      <h1><span class="fa fa-sign-in" /> Signup</h1>

      <form @submit.prevent="validateBeforeSubmit" novalidate>
        <div class="form-group">
          <label htmlFor="first-name">First Name</label>

          <div class="field">
            <input type="text" id="first-name" name="firstName" class="form-control" placeholder="First Name"
                   v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('firstName') }"
                   v-model="userData.firstName" />

            <span v-show="errors.has('firstName')" class="help is-danger">{{ errors.first('firstName') }}</span>
          </div>
        </div>

        <div class="form-group">
          <label htmlFor="last-name">Last Name</label>

          <div class="field">
            <input type="text" id="last-name" name="lastName" class="form-control" placeholder="Last Name"
                   v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('lastName') }"
                   v-model="userData.lastName" />

            <span v-show="errors.has('lastName')" class="help is-danger">{{ errors.first('lastName') }}</span>
          </div>
        </div>

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

        <div class="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>

          <div class="field">
            <input type="password" id="confirm-password" name="confirmPassword" class="form-control" placeholder="Confirm Password"
                   v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('confirmPassword') }"
                   v-model="userData.confirmPassword" />

            <span v-show="errors.has('confirmPassword')" class="help is-danger">{{ errors.first('confirmPassword') }}</span>
          </div>
        </div>

        <button type="submit" class="btn btn-warning btn-lg">Signup</button>
      </form>

      <hr />

      <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </div>
  </div>
</template>

<script src="./SignUpPage.vue.js"></script>
