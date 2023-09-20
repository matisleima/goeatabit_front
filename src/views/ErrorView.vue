<template>
    <h1>Ups... Midagi läks valesti :(</h1>
    <p></p>
    <a @click="goToLogin">Tagasi kodulehele</a>
    <p></p>
  <div>
    Kirjuta meile
  <a href = "mailto: probleem@goeatabit.email">probleem@goeatabit.email</a>
  </div>

</template>


<script>
import router from "@/router";

export default {
  name: "ErrorView",
  methods: {

    goToLogin() {
      router.push('/')
      sessionStorage.clear()
    },
  }
}
</script>


