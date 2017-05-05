<template>
  <modal :visible="visible" :title="displayHeader" :closeTitle="closeTitle" :closeStyle="closeStyle"
         :saveTitle="submitTitle" :onClose="onClose" :onSave="onSave">
    <div slot="body">
      <h4>{{displayTitle}}</h4>
    </div>
  </modal>
</template>

<script src="./Confirmation.vue.js"></script>
