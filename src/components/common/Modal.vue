<template>
  <div class="modal fade" v-bind:class="classObject" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" aria-label="Close" @click="close()"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{{title}}</h4>
        </div>

        <div class="modal-body">
          <slot name="body">
            Default body
          </slot>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn" v-bind:class="[closeBtnStyle]" @click="save()">{{saveBtn}}</button>

          <button type="button" class="btn btn-default" @click="close()">{{closeBtn}}</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
</template>

<style>
  .modal {
    z-index: 1;
  }
</style>

<script src="./Modal.vue.js"></script>
