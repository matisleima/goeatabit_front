<template>
  <LogoutModal ref="logoutModalRef"/>

  <h1>Minu pakkumised</h1>

  <div class="container text-center">
    <div class="row">

      <my-offers-table :filteredOffers="filteredOffers"/>

    </div>

    <div class="row">
      <div class="col">
        Column
      </div>
      <div class="col">
        Column
      </div>
      <div class="col">
        Column
      </div>
    </div>
    <div class="row">
      <div class="col">
        Column
      </div>
      <div class="col">
        Column
      </div>
      <div class="col">
        <div class="d-grid gap-3">
          <button @click="$router.push('/home')" type="button" class="btn btn-secondary">Kodu</button>
          <button @click="$router.push('/reservations')" type="button" class="btn btn-secondary">Minu broneeringud
          </button>
          <button @click="$router.push('/offer')" type="button" class="btn btn-secondary">Pakun süüa</button>
          <button @click="handleLogout" type="button" class="btn btn-secondary">Logi välja</button>
        </div>

      </div>
    </div>
  </div>

</template>


<script>
import MyOffersTable from "@/components/MyOffersTable.vue";
import DeleteOfferModal from "@/components/modal/DeleteOfferModal.vue";
import LogoutModal from "@/components/modal/LogoutModal.vue";

export default {
  name: 'MyOfferView',
  components: {LogoutModal, DeleteOfferModal, MyOffersTable},

  data() {
    return {
      offerId: 0,
      filteredOffers: [
        {
          offerId: 0,
          userId: 0,
          offerName: '',
          description: '',
          date: '',
          time: 0,
          address: '',
          firstName: '',
          lastName: '',
          price: 0,
          availableMeals: 0,
          userRating: 0,
          foodGroupId: 0

        }
      ]
    }

  },

  methods: {
    handleLogout() {
      this.$refs.logoutModalRef.$refs.modalRef.openModal()
    },
  }

}


</script>


<style>

</style>