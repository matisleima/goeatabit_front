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
          <tr>
            <td><a>{{ filteredOffer.date }}</a></td>
            <td><a>{{ filteredOffer.time }}</a></td>
            <td><a>{{ filteredOffer.address }}</a></td>
            <td><a>{{ filteredOffer.firstName }} {{ filteredOffer.lastName }}</a></td>
            <td>
              <div class="hover-container">
                <a>{{ filteredOffer.offerName }}</a>
                <div class="hover-text">{{ filteredOffer.description }}</div>
              </div>
            </td>
            <td><a>{{ filteredOffer.price }}€</a></td>
            <td><a>{{ filteredOffer.userRating }}</a></td>
            <td></td>

          </tr>
          </tbody>
        </table>
      </template>

      <template #footer>
        <button @click="confirm(); bookOffer()" type="button" class="btn btn-success">Kinnitan</button>
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

  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      filteredOffer: [
        {
          offerId: 0,
          userId: 0,
          userRating: 0,
          time: 0,
          date: '',
          price: 0,
          totalPortions: 0,
          offerName: '',
          description: '',
          foodGroupId: 0,
          offerStatus: '',
          address: '',
          districtId: 0,
          firstName: '',
          lastName: '',
          imageString: ''

        }
      ]
    }
  },
  methods: {
    getOfferByOfferId(userId, offerId) {
      console.log('enne päringut', offerId)
      this.$http.get("/meals/offer", {
            params: {
              offerId: offerId,
              userId: userId
            }
          }
      ).then(response => {
        this.filteredOffer = response.data
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },
    bookOffer() {
      this.$http.post("/meals/event", null, {
            params: {
              userId: this.userId,
              offerId: this.filteredOffer.offerId
            }
          }
      ).then(response => {
        const responseBody = response.data
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },

    confirm() {
      this.$refs.modalRef.closeModal()
      router.push({name: 'reservationsView'})
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