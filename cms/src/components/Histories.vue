<script>
export default {
  props: ["histories"],
};
</script>

<template>
  <div>
    <div class="container-fluid">
      <!-- Page Heading -->
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Histories</h1>
      </div>
      <!-- Histories -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated By</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(history, i) in histories" :key="history.id">
            <th scope="row">{{ i + 1 }}</th>
            <td>{{ history.name }}</td>    
            <td>{{ history.description }}</td>         
            <td>{{ history.createdAt }}</td> 
            <td>{{ history.updatedBy }}</td> 
          </tr>
        </tbody>
      </table>
      <!-- End of Histories -->
    </div>
  </div>
</template>
