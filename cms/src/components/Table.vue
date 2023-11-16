<script>
import Btn from "./Btn.vue"

export default {
  components: {
    Btn
  },
  props: ["product", "subPage", "i", "productFound"],
  data() {
    return {
      newStatus: this.product.status,
      productId: this.product.id,
      btn: {
        to: 'form',
        page: 'edit',
        showText : 'Edit',
        id: this.product.id
      }
    };
  },
  methods: {
    changeStatus() {
      const updateStatus = {
        newStatus: this.newStatus,
        productId: this.productId,
      };
      this.$emit("changeStatus", updateStatus);
    },
    editProduct(edit) {      
      this.$emit("editProduct", edit);
    }
  },
  computed: {
      toRupiah() {
        let rupiah = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        });
        return rupiah.format(this.product.price);
      },
    },
};
</script>

<template>
  <tr>
    <th scope="row">{{ i + 1 }}</th>
    <td>{{ product.name }}</td>
    <td>
      <img style="height: 150px" :src="product.imgUrl" alt="cannot load image" />
    </td>
    <td>{{ product.description }}</td>
    <td>{{ product.stock }}</td>
    <td>{{ toRupiah }}</td>
    <td>{{ product.User.email }}</td>
    <td>
      <select
        class="form-control form-select"
        name="status"
        @change="changeStatus"
        v-model="newStatus"
        :productFound="productFound"
      >
        <option value="Active" :selected="product.status === 'Active'">
          Active
        </option>
        <option value="Inactive" :selected="product.status === 'Inactive'">
          Inactive
        </option>
        <option value="Archived" :selected="product.status === 'Archived'">
          Archived
        </option>
      </select>
    </td>
    <td>
      <!-- Button Component -->
      <Btn @editProduct="editProduct" :btn="btn" class="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm"/>
      <!--  -->
    </td>
  </tr>
</template>
