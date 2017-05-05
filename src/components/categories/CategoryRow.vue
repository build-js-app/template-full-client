<template>
  <tr>
    <td>{{category.title}}</td>
    <td>{{category.description}}</td>
    <td>
      <a href="#" @click="edit()">Edit</a>
    </td>
    <td>
      <a href="#" @click="deleteCategory()">Delete</a>
    </td>
  </tr>
</template>

<script src="./CategoryRow.vue.js"></script>
