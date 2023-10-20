import { defineStore } from "pinia";
import axios from 'axios'

export const useUniqgwStore = defineStore('uniqgw', {
    state(){
        return {
            baseUrl: 'http://localhost:3000/pub'
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
    },
  })