<template>
  <nav class="navbar navbar-default" v-if="user">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>

        <a class="navbar-brand" href="#">Expanse Manager</a>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li>
            <router-link to="/records">Records</router-link>
          </li>

          <li>
            <router-link to="/categories">Categories</router-link>
          </li>

          <li>
            <router-link to="/settings">Settings</router-link>
          </li>
        </ul>

        <ul class="nav navbar-nav navbar-right">
          <li>
            <a href="#">Logged as: <b>{{displayUserFullName}}</b></a>
          </li>
          <li>
            <a href="#" @click="logout()">LogOut</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script src="./Navigation.vue.js"></script>
