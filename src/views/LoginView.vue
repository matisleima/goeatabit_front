<template>

  <div class="container text-center">
    <div class="row">
      <div class="col">
        {{ this.errorResponse.message }}
      </div>
      <div class="col">
        Column
      </div>
      <div class="col">
        <p><input v-model="email" type="text" id="exampleInputEmail1"/></p>
        <p><input v-model="password" type="password" id="exampleInputPassword1"></p>
        <button @click="login" type="submit">Log</button>
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
      },
      errorResponse: {
        message: '',
        errorCode: 0
      },
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
        this.errorResponse=error.response.data

      })
    },

    goToHome() {
      router.push({name:'homeRoute'})
    },
  }

}


</script>