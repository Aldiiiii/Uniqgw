<script>
export default {
  props: ["categories", "addOrEdit", "productFound"],
  data() {
    return {
      product: {
        name: this.productFound.name,
        categoryId: this.productFound.categoryId,
        description: this.productFound.description,
        stock: this.productFound.stock,
        price: this.productFound.price,
        imgUrl: this.productFound.imgUrl,
      },
    };
  },
  methods: {
    addOrEditProduct(data) {
      if (this.addOrEdit === "add") {
        return this.addProduct()
      }else{
        return this.submitEdit(data)
      }
    },
    addProduct() {
      this.$emit("addProduct", this.product);
    },
    submitEdit() {
      this.product.id = this.productFound.id
      this.$emit("submitEdit", this.product);
    },
  },
  created() {
    if (this.addOrEdit === "add") {
      this.product.name = "";
      this.product.categoryId = "0";
      this.product.description = "";
      this.product.stock = "";
      this.product.price = "";
      this.product.imgUrl = "";
    }
  },
};
</script>

<template>
  <div>
    <div class="container-fluid">
      <!-- Page Heading -->
      <h1 class="h3 mb-4 text-gray-800">
        <span v-if="addOrEdit === 'add'">Add</span>
        <span v-if="addOrEdit === 'edit'">Edit</span> Product
      </h1>
      <form @submit.prevent="addOrEditProduct" class="user">
        <div class="form-group">
          <input
            v-model="product.name"
            type="text"
            class="form-control form-control-user"
            placeholder="Name"
          />
        </div>
        <div class="form-group">
          <select
            v-model="product.categoryId"
            class="form-control form-select"
            style=""
            aria-label="Large select example"
          >
            <option :value="0" disabled>--- Select Category ---</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <input
            v-model="product.description"
            type="text"
            class="form-control form-control-user"
            placeholder="Description"
          />
        </div>
        <div class="form-group">
          <input
            v-model="product.stock"
            type="number"
            class="form-control form-control-user"
            placeholder="Stock"
          />
        </div>
        <div class="form-group">
          <input
            v-model="product.price"
            type="number"
            class="form-control form-control-user"
            placeholder="Price"
          />
        </div>
        <div class="form-group">
          <input
            v-model="product.imgUrl"
            type="text"
            class="form-control form-control-user"
            placeholder="Image URL"
          />
        </div>
        <button type="submit" class="btn btn-primary btn-user btn-block">
          <span v-if="addOrEdit === 'add'">Add</span
          ><span v-if="addOrEdit === 'edit'">Update</span>
        </button>
        <hr />
      </form>
    </div>
  </div>
</template>
