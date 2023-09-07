<template>

  <div class="container text-center">
    <div class="row">
      <div class="col">
        Column
      </div>
      <div class="col">
        Column
      </div>
      <div class="col">
        <p><input v-model="email" type="email"/></p>
        <p><input v-model="password" type="password"></p>
        <button @click="login">Log</button>
      </div>
    </div>
  </div>


</template>

<script>
import router from "@/router";

export default{
  data() {
    return{
      email: '',
      password: '',
      loginResponse:{
        userId:0
      }
    }
  },
  methods:{
    login() {
      this.$http.get("/login", {
            params: {
              email: this.email,
              password: this.password
            }
          }
      ).then(response => {
        // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
        this.loginResponse.userId = response.data.userId

        sessionStorage.setItem('userId', this.loginResponse.userId)
        this.goToHome()
      }).catch(error => {
        // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
        const errorResponseBody = error.response.data
      })
    },

    goToHome() {
      router.push({name:'homeRoute'})
    },
  }

}


</script>