<template>
  <logout-modal ref="logoutModalRef"/>
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
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Kuupäev</th>
              <th scope="col">Kell</th>
              <th scope="col">Aadress</th>
              <th scope="col">Pakkuja</th>
              <th scope="col">Söök</th>
              <th scope="col">Hind</th>
              <th scope="col">Broneeringuid</th>
              <th scope="col">Hinnang</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="event in myEvents" :key="event.eventId">
              <td><a>{{ event.date }}</a></td>
              <td><a>{{ event.time }}</a></td>
              <td><a>{{ event.address }}</a></td>
              <td><a>{{ event.firstName }} {{ event.lastName }}</a></td>
              <td>
                <div class="hover-container">
                  <a>{{ event.offerName }}</a>
                  <div v-show="event.description.length > 0" class="hover-text">{{ event.description }}</div>
                </div>
              </td>
              <td><a>{{ event.price }}€</a></td>
              <td><a>?/{{event.totalPortions}}</a></td>
              <td><a>{{ event.offerUserRating }}</a></td>

            </tr>
            </tbody>
          </table>
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
            <button @click="$router.push('/reserve')" type="button" class="btn btn-secondary">Tahan süüa</button>
            <button @click="$router.push('/my-offers')" type="button" class="btn btn-secondary">Minu pakkumised</button>
            <button @click="handleLogout" type="button" class="btn btn-secondary">Logi välja</button>

          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import OffersTable from "@/components/OffersTable.vue";
import LogoutModal from "@/components/modal/LogoutModal.vue";

export default {
  name: "ReservationsView",
  components: {LogoutModal, OffersTable},
  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      myEvents: [
        {
          eventId: 0,
          clientUserId: 0,
          offerId: 0,
          offerUserId: 0,
          offerUserRating: 0,
          time: 0,
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
      ]
    }
  },
  methods: {
    getMyEvents() {
      this.$http.get("/meals/events", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        this.myEvents = response.data
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },
    handleLogout() {
      this.$refs.logoutModalRef.$refs.modalRef.openModal()
    },
  },

  mounted() {
    this.getMyEvents()
  }
}
</script>