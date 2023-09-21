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
        <button @click="bookAndGo()" type="button" class="btn btn-success">Kinnitan</button>
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
      offerId: 0,
      userId: sessionStorage.getItem('userId'),
      offer:{
        date: '',
        time: '',
        address: '',
        firstName: '',
        lastName: '',
        offerName: '',
        description: '',
        price: 0,
        userRating: 0
      }
    }
  },
  methods: {
    getMealConfirmationInfo() {
      this.$http.get("/meals/offer/booking/confirmation-info", {
            params: {
              offerId: this.offerId
            }
          }
      ).then(response => {
        this.offer = response.data
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },
    bookOffer() {
      this.$http.post("/meals/event", null, {
            params: {
              userId: this.userId,
              offerId: this.offerId
            }
          }
      ).then(response => {
        router.push({name: 'reservationsRoute'})
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    bookAndGo() {
      this.$refs.modalRef.closeModal()
      this.bookOffer()
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