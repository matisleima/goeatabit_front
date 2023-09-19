<template>

  <delete-offer-modal ref="deleteOfferRef"/>

  <h1>Minu pakkumised</h1>

  <div class="container text-center">
    <div class="row">

      <my-offers-table @event-open-delete-offer-modal="openDeleteOfferModal"/>

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
        *** Buttons here ***

      </div>
    </div>
  </div>

</template>


<script>
import OffersTable from "@/components/OffersTable.vue";
import MyOffersTable from "@/components/MyOffersTable.vue";
import DeleteOfferModal from "@/components/modal/DeleteOfferModal.vue";

export default {
  name: 'MyOfferView',
  components: {DeleteOfferModal, MyOffersTable},

  methods: {

    openDeleteOfferModal(offerId) {
      this.$refs.deleteOfferRef.$refs.modalRef.openModal(offerId)
    }

  }

}


</script>


<style>

</style>