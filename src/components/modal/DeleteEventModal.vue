<template>
  <div>
    <Modal close-button-name="Sulge" ref="modalRef">
      <template #header>
        <h3>Kustuta broneering?</h3>
      </template>
      <template #body>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Kuupäev</th>
            <th scope="col">Kell</th>
            <th scope="col">Söök</th>
            <th scope="col">Hind</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><a>{{ event.date }}</a></td>
            <td><a>{{ event.time }}</a></td>
            <td><a>{{ event.offerName }}</a></td>
            <td><a>{{ event.price }}€</a></td>
          </tr>
          </tbody>
        </table>
      </template>
      <template #footer>
        <button @click="deleteEvent()" type="button" class="btn btn-danger">Kustuta</button>
      </template>
    </Modal>

  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";


export default {
  name: 'DeleteOfferModal',
  components: {Modal},
  data() {
    return {
      event:{
        eventId: 0,
        clientUserId: 0,
        offerId: 0,
        offerUserId: 0,
        offerUserRating: 0,
        time: '',
        date: '',
        price: 0,
        totalPortions: 0,
        offerName: '',
        description: '',
        offerStatus: '',
        eventStatus: '',
        firstName: '',
        lastName: '',
        address: ''
      }
    }

  },
  methods: {
    deleteEvent() {
      this.$refs.modalRef.closeModal()

      this.$http.delete("/meals/event", {
              params: {
                eventId: this.event.eventId
              }
            }
        ).then(response => {
          this.$emit("event-event-successfully-deleted")
        }).catch(error => {
          alert('Error: event not deleted!')
        })
    }
  }
}
</script>