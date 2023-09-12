<template>
  <div>
    <SignupModal ref="signupModalRef" @event-user-registration-success="showSignupSuccessMessage"/>>

    LOGIN

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
            <div class="col">
              <AlertDanger :alert-message="errorResponse.message"/>
              <AlertSuccess :alert-message="signupSuccessMessage"/>
            </div>


            <input v-model="email" type="text" class="form-control" id="exampleInputEmail1"
                   placeholder="Sisesta email">
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1"
                   placeholder="Sisesta parool">
            <button @click="login" type="submit" class="btn btn-primary">Logi sisse</button>
            <button @click="openSignupModal" type="submit" class="btn btn-primary">Loo kasutaja</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import SignupModal from "@/components/modal/SignupModal.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";



export default {
  name: "LoginView",
  components: {AlertSuccess, AlertDanger, SignupModal},

  data() {
    return {
      signupSuccessMessage: '',

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
      this.signupSuccessMessage = ''
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

        if (error.response.status === 500 ) {
          router.push({name: 'errorRoute'})
        }

        this.errorResponse = error.response.data


      })
    },
    goToHome() {
      router.push({name: 'homeRoute'})
    },
    resetErrorMessage() {
      this.errorResponse.message = ''
    },

    getAndSetUserIdFromSessionStorage() {
      this.loginResponse.userId = sessionStorage.getItem("userId")
    },

    openSignupModal() {
      this.$refs.signupModalRef.$refs.modalRef.openModal()
    },

    showSignupSuccessMessage (successMessage) {
      this.signupSuccessMessage = successMessage
    }

  },
  mounted() {
    this.getAndSetUserIdFromSessionStorage()
    if (this.loginResponse.userId !== null) {
      this.goToHome()
    }

  }
}

</script>
