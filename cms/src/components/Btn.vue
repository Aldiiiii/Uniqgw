<script>
export default {
    props: ["btn"],
  methods: {
    addOrEdit(to, isAddOrEdit, productId){
      if(productId){
        return this.editProduct(to, isAddOrEdit, productId)
      }else{
        return this.changeSubPage(to, isAddOrEdit)
      }
    },
    changeSubPage(to, isAddOrEdit){
      this.$emit("changeSubPage", to, isAddOrEdit)
    },
    editProduct(to, isAddOrEdit, id){
      const edit = {
        to,
        isAddOrEdit,
        id
      }
      this.$emit("editProduct", edit)
    }
  },
};
</script>

<template>
  <a @click.prevent="addOrEdit(btn.to, btn.page, btn.id)">{{btn.showText}}</a>
</template>
