<template>
  <LogoutModal ref="logoutModalRef"/>
  <div>
    <h1>Tänased TOP pakkumised MINGI_FILTER</h1>
  </div>

<!--  //PILDID-->

  <div class="container">
    <div class="row">
      <div class="col">
        <img src="../assets/script/meal.jpg" height="400" width="400"/>
      </div>
      <div class="col">
       DEFAULT PILT VÕI OFFER PILT
      </div>
      <div class="col">
        DEFAULT PILT VÕI OFFER PILT
      </div>
    </div>
  </div>

<!--  //TABEL-->

  <div class="container">
    <div class="row">
      <div class="col">

        <table class="table">
          <thead>
          <tr>
            <th scope="col">Pakkuja</th>
            <th scope="col">Pakkumine</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
          <tr>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>

<!--  //NUPUD-->

  <div class="container text-center">
    <div class="row">
      <div class="col">
        <button @click="handleLogout" type="button" class="btn btn-secondary" >Logi välja</button>
      </div>
      <div class="col">
        <button @click="handleLogout" type="button" class="btn btn-secondary" >Logi välja</button>
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