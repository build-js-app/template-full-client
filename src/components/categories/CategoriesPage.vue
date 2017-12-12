<template>
  <page-content>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-11 col-md-offset-1">
          <div class="row">
            <div class="col-sm-12">
              <h2>Categories Page</h2>
            </div>
          </div>

          <br/>

          <div class="row">
            <div class="col-sm-12">
              <button type="button" class="btn btn-primary" @click="addCategory()">Add new category</button>
            </div>
          </div>

          <categories-list :onEdit="editCategory" :onDelete="confirmDeleteCategory"></categories-list>
        </div>
      </div>

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
    </div>
  </page-content>
</template>

<script src="./CategoriesPage.vue.js"></script>
