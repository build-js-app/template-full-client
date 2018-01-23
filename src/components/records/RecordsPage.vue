<template>
  <page-content>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <div class="row">
            <div class="col-sm-12">
              <h2>Records Page</h2>
            </div>
          </div>

          <br/>

          <filter-bar :sortBy="sortBy" :onAddClick="addRecord" :onSortChange="sortChange"></filter-bar>

          <records-list :onEdit="editRecord" :onDelete="confirmDeleteRecord"></records-list>
        </div>
      </div>

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
    </div>
  </page-content>
</template>

<script src="./RecordsPage.vue.js"></script>
