<template>
  <div>
    <Modal close-button-name="Sulge" ref="modalRef">
      <template #header>
        <h3>Kustuta offerId?</h3>
      </template>
      <template #body>
        offer details here
      </template>
      <template #footer>
        <button @click="deleteOffer" type="button" class="btn btn-danger">Kustuta</button>
      </template>
    </Modal>

  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";


export default {
  name: 'DeleteOfferModal',
  components: {Modal},
  props: {
    /*offer: {},*/
    offerId: Number
  },


  methods: {

    deleteOffer() {
      alert("delete offer request to db")
      /*  this.$http.delete("/meals/offer", {
              params: {
                locationId: this.locationId
              }
            }
        ).then(response => {
          this.$emit("event-offer-successfully-deleted")
        }).catch(error => {
          const errorResponseBody = error.response.data
        })*/
    },
  }
}
</script>