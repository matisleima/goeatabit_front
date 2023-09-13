<template>
  <div>

    <div class="container">
      <div class="row">
        <div class="col col-2">
          <h1>RESERVE</h1>
        </div>
        <div class="col">
          2
        </div>
        <div class="col col-2">
          <button @click="handleLogout" type="button" class="btn btn-secondary" >Logi välja</button>

        </div>
      </div>

      <div class="row">
        <div class="col col-2">
          <filters/>
        </div>
        <div class="col mt-5">
          <offers-table/>
        </div>
        <div class="col col-2">
          6
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import OffersTable from "@/components/OffersTable.vue";
import Filters from "@/components/Filters.vue";
import LogoutModal from "@/components/modal/LogoutModal.vue";

export default {
  name: "ReserveView",
  components: {Filters, OffersTable, LogoutModal}



}
</script>