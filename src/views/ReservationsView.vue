<template>
  <div>
    <div class="container">
      <div class="row mt-5">
        <div class="col col-6">
          <h1>MINU BRONEERINGUD</h1>
        </div>

        <div class="col">
        </div>

        <div class="col col-2">
        </div>

      </div>
      <div class="row">
        <div class="col col-2">
        </div>

        <div class="col mt-5">
        MY RESERVATIONS TABLE

        </div>

        <div class="col col-2">
        </div>
      </div>

      <div class="row">
        <div class="col">
        </div>

        <div class="col">
        </div>

        <div class="col col-2">
          <div class="d-grid gap-3">
            <button @click="handleLogout" type="button" class="btn btn-secondary">Tahan süüa</button>
            <button @click="handleLogout" type="button" class="btn btn-secondary">Minu pakkumised</button>
            <button @click="handleLogout" type="button" class="btn btn-secondary">Logi välja</button>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>

<script>
import OffersTable from "@/components/OffersTable.vue";

export default {
  name: "ReservationsView",
  components: { OffersTable}
}
</script>