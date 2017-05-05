<template>
  <page-content>
    <section class="container-fluid">
      <div class="row">
        <aside class="col-xs-1" />
        <section class="content-main col-xs-10">
          <h1>Categories Page</h1>

          <br/>

          <button type="button" class="btn btn-primary" @click="addCategory()">Add new category</button>

          <categories-list :onEdit="editCategory" :onDelete="confirmDeleteCategory"></categories-list>

          <save-category :category="categoryToEdit"
                         :showModal="showModal"
                         :title="title"
                         :onClose="closeModal"
                         :onSave="saveCategory">
          </save-category>

          <confirmation :visible="showConfirmation"
                        :header="'Delete category'"
                        :onClose="closeConfirmation"
                        :onSave="deleteCategory">
          </confirmation>
        </section>
        <aside class="col-xs-1" />
      </div>
    </section>
  </page-content>
</template>

<script src="./CategoriesPage.vue.js"></script>
