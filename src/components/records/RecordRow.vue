<template>
  <tr>
    <td>{{dateDisplay}}</td>
    <td>{{category}}</td>
    <td>{{record.cost}}</td>
    <td>{{record.note}}</td>
    <td>
      <a href="#" @click="edit()">Edit</a>
    </td>
    <td>
      <a href="#" @click="deleteRecord()">Delete</a>
    </td>
  </tr>
</template>

<script src="./RecordRow.vue.js"></script>
