import { defineStore } from 'pinia'
import axios from 'axios'

export const useUniqgwStore = defineStore('uniqgw', {
  state() {
    return {
      baseUrl: 'http://localhost:3000/pub',
      products: [],
      product: {},
      wishlists: [],
      totalPages: 0,
      currentPage: 0,
      isLoggedIn: false
    }
  },
  actions: {
    async register(data){
        try {
            const signUp = await axios.post(this.baseUrl + '/register', data)
            localStorage.access_token = signUp.data.token
            this.router.push('/')          
        } catch (error) {
            console.log(error)
        }
    },
    async googleLogin(response){
        try {
            const login = await axios.post(this.baseUrl + '/login-google', {}, {
                headers: {
                    google_token: response.credential
                }
            })
            localStorage.access_token = login.data.token
            this.router.push('/')
        } catch (error) {
            console.log(error)
        }
    },
    async getLogin(data) {
      try {
        const user = await axios.post(this.baseUrl + '/login', data)
        localStorage.access_token = user.data.token
        this.router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
    getLogout() {
      localStorage.clear()
      this.router.push('/login')
    },
    async fetchProducts(query) {
      try {
        let addQuery = ''

        query.page ? addQuery = 'page=' + query.page : ''
        query.name ? addQuery = 'name=' + query.name : ''
        if(query.page && query.name){
            addQuery = 'page='+ query.page + '&name=' + query.name
        }

        const {data} = await axios.get(this.baseUrl + '/products?' + addQuery)

        this.products = data.products
        this.totalPages = data.totalPages
        this.currentPage = data.currentPage
      } catch (error) {
        console.log(error)
      }
    },
    async productById(id) {
      try {
        const { data } = await axios.get(this.baseUrl + '/products/' + id)
        this.product = data
      } catch (error) {
        console.log(error)
      }
    },
    async addWishlist(id) {
      try {
        await axios.post(
          this.baseUrl + '/wishlist',
          {
            ProductId: id
          },
          {
            headers: {
              access_token: localStorage.access_token
            }
          }
        )
        console.log('add wishlist sukses')
      } catch (error) {
        console.log(error)
      }
    },
    async fetchWishlist(){
        try {
            const { data } = await axios.get(this.baseUrl + '/wishlist', {
                headers: {
                    access_token: localStorage.access_token
                }
            })
            console.log(data)
            this.wishlists = data
        } catch (error) {
            console.log(error)
        }
    }
  }
})
