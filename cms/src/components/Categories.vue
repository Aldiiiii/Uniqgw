<script>
export default {
  props: ["categories"],
};
</script>

<template>
  <div>
    <div class="container-fluid">
      <!-- Page Heading -->
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Categories</h1>
      </div>
      <!-- Categories -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, i) in categories" :key="category.id">
            <th scope="row">{{ i + 1 }}</th>
            <td>{{ category.name }}</td>            
          </tr>
        </tbody>
      </table>
      <!-- End of Categories -->
    </div>
  </div>
</template>
