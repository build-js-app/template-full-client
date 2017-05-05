<template>
  <div class="container">
    <div class="col-xs-8 col-xs-offset-0 col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3">
      <h1>Activation Page</h1>

      <br/>

      <div v-if="activationData.message" v-bind:class="alertClass">{{activationData.message}}</div>

      <hr />

      <p>Redirect to login page: <router-link to="/login">Login</router-link></p>
    </div>
  </div>
</template>

<script src="./ActivationPage.vue.js"></script>
