<template>
  <page-content>
    <section class="container-fluid">
      <div class="row">
        <aside class="col-xs-1" />
        <section class="content-main col-xs-10">
          <h1>Records Page</h1>

          <br/>

          <filter-bar :sortBy="sortBy" :onAddClick="addRecord" :onSortChange="sortChange"></filter-bar>

          <records-list :onEdit="editRecord" :onDelete="confirmDeleteRecord"></records-list>

          <save-record :record="recordToEdit"
                       :categories="categories"
                       :showModal="showModal"
                       :title="title"
                       :onClose="closeModal"
                       :onSave="saveRecord">
          </save-record>

          <confirmation :visible="showConfirmation"
                        :header="'Delete record'"
                        :onClose="closeConfirmation"
                        :onSave="deleteRecord">
          </confirmation>
        </section>
        <aside class="col-xs-1" />
      </div>
    </section>
  </page-content>
</template>

<script src="./RecordsPage.vue.js"></script>
