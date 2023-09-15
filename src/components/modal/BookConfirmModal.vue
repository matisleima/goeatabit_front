<template>
  <div>
    <Modal close-button-name="Tagasi" ref="modalRef">

      <template #header>
        <h3>Kinnita broneering</h3>
      </template>

      <template #body>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Kuupäev</th>
            <th scope="col">Kell</th>
            <th scope="col">Aadress</th>
            <th scope="col">Pakkuja</th>
            <th scope="col">Söök</th>
            <th scope="col">Hind</th>
            <th scope="col">Hinnang</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="offer in filteredOffers" :key="filteredOffers.offerId">
            <td><a>{{ offer.date }}</a></td>
            <td><a>{{ offer.time }}</a></td>
            <td><a>{{ offer.address }}</a></td>
            <td><a>{{ offer.firstName }} {{ offer.lastName }}</a></td>
            <td>
              <div class="hover-container">
                <a>{{ offer.offerName }}</a>
                <div class="hover-text">{{ offer.description }}</div>
              </div>
            </td>
            <td><a>{{ offer.price }}€</a></td>
            <td><a>{{ offer.userRating }}</a></td>
            <td></td>

          </tr>
          </tbody>
        </table>
      </template>

      <template #footer>
        <button @click="confirm" type="button" class="btn btn-success">Kinnitan</button>
      </template>

    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";
import OffersTable from "@/components/OffersTable.vue";

export default {
  name: 'BookConfirmModal',
  components: {OffersTable, Modal},
  props: {
    selectedOffer: 0
  },
  data() {
    return {
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
          userRating: 0
        }
      ]
    }
  },
  methods: {
    getOfferByOfferId(userId) {
      this.$http.get("/meals/offer", {
            params: {
              offerId: this.selectedOffer,
              userId: userId
            }
          }
      ).then(response => {
        alert(response.data.date)
        this.filteredOffers = response.data
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },
    confirm() {
      this.$refs.modalRef.closeModal()
      router.push({name: 'reservationsRoute'})
    },
  }
}
</script>
<style>

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

</style>