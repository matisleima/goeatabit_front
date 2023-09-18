<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <button @click="navigateToOffersView" type="button" class="btn btn-secondary">Rohkem valikuid</button>
      </div>
      <div class="col">
        <button type="button" class="btn btn-secondary">Vaata kaardilt</button>
      </div>
      <div class="col">
        <button @click="handleLogout" type="button" class="btn btn-secondary">Logi välja</button>
      </div>
    </div>
  </div>
</template>
<script>
import router from "@/router";

export default {
  name: 'HomePageButtons',
  props: {
    handleLogout: {}
  },
  methods:{
    navigateToOffersView(){
      router.push({name:'reserveRoute'})
    },
  }
}
</script>