<template>


  <div style="background-color: #a5912a" class="container" @keydown.enter="login">
    <div class="row">
    </div>

    <div class="row">
      <div class="col">
<h1>GO EAT A BIT</h1>
      </div>


      <div class="col">


      </div>

      <div class="col">

          <div class="d-grid gap-3">
            <div v-show="this.errorResponse.message.length > 0" class="alert alert-danger" role="alert">
              {{ this.errorResponse.message }}
            </div>
            <input v-model="email" type="text" class="form-control" id="exampleInputEmail1"
                   placeholder="Sisesta email">
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1"
                   placeholder="Sisesta parool">
            <button @click="login" type="submit" class="btn btn-primary">Logi sisse</button>
            <button @click="login" type="submit" class="btn btn-primary">Loo kasutaja</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      loginResponse: {
        userId: 0
      },
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },

  methods: {
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
        this.resetErrorMessage()
        this.goToHome()
      }).catch(error => {
        // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
        this.errorResponse = error.response.data
      })
    },
    goToHome() {
      router.push({name: 'landingRoute'})
    },
    resetErrorMessage() {
      this.errorResponse.message = ''
    },
  },
}

</script>