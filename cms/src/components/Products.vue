<script>
import Table from "./Table.vue";
import Form from "./Form.vue";
import Btn from "./Btn.vue";

export default {
  props: ["products", "subPage", "addOrEdit", "productFound"],
  data() {
    return {
      btn: {
        to: "form",
        page: "add",
        showText: "+Add Product",
      },
    };
  },
  components: {
    Table,
    Form,
    Btn,
  },
  methods: {
    changeStatus(newStatus) {
      this.$emit("changeStatus", newStatus);
    },
    changeSubPage(to, isAddOrEdit) {
      this.$emit("changeSubPage", to, isAddOrEdit);
    },
    editProduct(edit) {
      this.$emit("editProduct", edit);
    }    
  }
};
</script>

<template>
  <div>
    <div class="container-fluid">
      <!-- Page Heading -->
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Products</h1>

        <!-- Button Component -->
        <Btn
          @changeSubPage="changeSubPage"
          :btn="btn"
          class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        />
        <!-- End of Button Component -->
      </div>
      <!-- Products -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Description</th>
            <th scope="col">Stock</th>
            <th scope="col">Price</th>
            <th scope="col">Author</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <Table
            v-for="(product, i) in products"
            :key="product.id"
            :subPage="subPage"
            :i="i"
            :product="product"
            @changeStatus="changeStatus"
            @changeSubPage="changeSubPage"
            @editProduct="editProduct"
            :productFound="productFound"
          />
        </tbody>
      </table>
      <!-- End of Products -->
    </div>
  </div>
</template>
