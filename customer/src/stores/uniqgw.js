import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const toast = useToast()
export const useUniqgwStore = defineStore('uniqgw', {
  state() {
    return {
    //   baseUrl: 'https://toko.amrinaldi.site/pub',
      baseUrl: 'http://localhost:3000/pub',
      products: [],
      product: {},
      wishlists: [],
      totalPages: 0,
      currentPage: 0,
      qrCode: '',
      isLoggedIn: false
    }
  },
  actions: {
    async register(data) {
      try {
        const signUp = await axios.post(this.baseUrl + '/register', data)
        localStorage.access_token = signUp.data.token
        this.router.push('/')
        toast.success('Register Success', {
          position: 'top-right'
        })
      } catch (error) {
        toast.error(error.response.data.message, {
          position: 'top-right'
        })
      }
    },
    async googleLogin(response) {
      try {
        const login = await axios.post(
          this.baseUrl + '/login-google',
          {},
          {
            headers: {
              google_token: response.credential
            }
          }
        )
        localStorage.access_token = login.data.token
        this.router.push('/')
        toast.success('Login Success', {
          position: 'top-right'
        })
      } catch (error) {
        toast.error(error.response.data.message, {
          position: 'top-right'
        })
      }
    },
    async getLogin(data) {
      try {
        const user = await axios.post(this.baseUrl + '/login', data)
        localStorage.access_token = user.data.token
        this.router.push('/')

        toast.success('Login Success', {
          position: 'top-right'
        })
      } catch (error) {
        toast.error(error.response.data.message, {
          position: 'top-right'
        })
      }
    },
    getLogout() {
      if (localStorage.access_token) {
        localStorage.clear()
        this.router.push('/login')
        toast.success('Logout Success', {
          position: 'top-right'
        })
      }
    },
    async fetchProducts(query) {
      try {
        let addQuery = ''

        query.page ? (addQuery = 'page=' + query.page) : ''
        query.name ? (addQuery = 'name=' + query.name) : ''
        if (query.page && query.name) {
          addQuery = 'page=' + query.page + '&name=' + query.name
        }

        const { data } = await axios.get(this.baseUrl + '/products?' + addQuery)

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
        toast.success('Added to wishlist', {
          position: 'top-right'
        })
      } catch (error) {
        toast.error(error.response.data.message, {
          position: 'top-right'
        })
      }
    },
    async fetchWishlist() {
      try {
        const { data } = await axios.get(this.baseUrl + '/wishlist', {
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.wishlists = data
      } catch (error) {
        console.log(error)
      }
    },
    async getQrCode(urlDetail) {
      try {
        const { data } = await axios.post(this.baseUrl + '/products/:id', {
          urlDetail
        })
        this.qrCode = data
      } catch (error) {
        console.log(error)
      }
    }
  }
})
