<template>
  <div>
    <Modal close-button-name="Sulge" ref="modalRef">
      <template #header>
        <h3>Kustuta pakkumine nr. {{ offer.offerId }}?</h3>
      </template>
      <template #body>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Kuupäev</th>
            <th scope="col">Kell</th>
            <th scope="col">Söök</th>
            <th scope="col">Kirjeldus</th>
            <th scope="col">Hind</th>
            <th scope="col">Vabu kohti</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><a>{{ formatDate(offer.date) }}</a></td>
            <td><a>{{ offer.time }}</a></td>
            <td><a>{{ offer.offerName }}</a></td>
            <td><a>{{ offer.description }}</a></td>
            <td><a>{{ offer.price }}€</a></td>
            <td><a>{{ offer.totalPortions }}</a></td>
          </tr>
          </tbody>
        </table>
      </template>
      <template #footer>
        <button @click="deleteOffer" type="button" class="btn btn-danger">Kustuta</button>
      </template>
    </Modal>

  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import {OFFER_DELETED, USER_REGISTERED} from "@/assets/script/AlertMessage";


export default {
  name: 'DeleteOfferModal',
  components: {Modal},
  data() {
    return {
      offer: {
        offerId: 0,
        userId: 0,
        offerName: '',
        description: '',
        date: '',
        time: '',
        address: '',
        firstName: '',
        lastName: '',
        price: 0,
        availableMeals: 0,
        userRating: 0
      }
    }

  },


  methods: {

    deleteOffer() {
      this.$refs.modalRef.closeModal()
      this.$http.delete("/meals/offer", {
            params: {
              offerId: this.offer.offerId
            }
          }
      ).then(response => {
        this.handleDeleteOfferSuccessResponse()
      }).catch(error => {
        this.handleErrorResponse(error)
      })
    },

    handleDeleteOfferSuccessResponse() {
      this.successMessage = OFFER_DELETED
      this.$emit('event-offer-deletion-success', this.successMessage)
      this.$refs.modalRef.closeModal()
    },
    formatDate(date){
      const parts = date.split('-');
      return `${parts[2]}.${parts[1]}`
    }
  }
}
</script>