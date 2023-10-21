import { defineStore } from "pinia";
import axios from 'axios'

export const useUniqgwStore = defineStore('uniqgw', {
    state(){
        return {
            baseUrl: 'http://localhost:3000/pub',
            products: [],
            product: {}
        }
    },
    actions: {
        async getLogin(data){
            try {
                const user = await axios.post(this.baseUrl + '/login', data)
                localStorage.access_token = user.data.token
                this.router.push('/')
            } catch (error) {
                console.log(error)
            }
        },
        getLogout(){
            localStorage.clear()
            this.router.push('/login')
        },
        async fetchProducts(){
            try {
                const {data} = await axios.get(this.baseUrl + '/products')
                this.products = data.rows
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },
        async productById(id){
            try {
                const {data} = await axios.get(this.baseUrl + '/products/' + id)
                this.product = data
            } catch (error) {
                console.log(error)
            }
        }
    },
  })