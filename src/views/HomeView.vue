<template>
  <LogoutModal ref="logoutModalRef"/>
  <div>
    <h1>Home PAGE</h1>
  </div>

  <div class="container text-center">
    <div class="row">
      <div class="col">
        Column
      </div>
      <div class="col">
        Column
      </div>
      <div class="col">
        <button @click="handleLogout" type="button" class="btn btn-secondary" >Logi välja</button>
      </div>
    </div>
  </div>


</template>

<script>
import LogoutModal from "@/components/modal/LogoutModal.vue";

export default{
  name: 'HomeView',
  components: {LogoutModal},

  methods: {

    handleLogout() {
      this.$refs.logoutModalRef.$refs.modalRef.openModal()
    },

  }

}





</script>