<template>
  <logout-modal ref="logoutModalRef"/>
  <delete-event-modal @event-event-successfully-deleted="handleSuccessfulDeletion" ref="deleteEventRef"/>

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
        <div class="col col-1">
        </div>

        <div class="col mt-5">
          <table class="table">
            <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Kuupäev</th>
              <th scope="col">Kell</th>
              <th scope="col">Aadress</th>
              <th scope="col">Pakkuja</th>
              <th scope="col">Söök</th>
              <th scope="col">Hind</th>
              <th scope="col">Hinnang</th>
              <th scope="col">Kustuta</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="event in myEvents" :key="event.eventId">
              <th>
                <div class="hover-container">

                <a v-if="event.offerStatus === 'D'" id="">
                  <font-awesome-icon :icon="['fas', 'circle-exclamation']" size="xl" style="color: #ff3842;" />
              </a>
                  <div v-show="event.description.length > 0" class="hover-text">Pakkuja on selle pakkumise tühistanud!</div>
                </div>
              </th>
              <td><a>{{ formatDate(event.date) }}</a></td>
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
              <td><a>{{ event.offerUserRating }}</a></td>
              <td><a>
                <font-awesome-icon @click="openDeleteEventModal(event)" class="hoverable-link m-2"
                                   :icon="['fas', 'trash']"/>
              </a></td>
            </tr>
            </tbody>
          </table>
        </div>


        <div class="col col-2">
          <div class="d-grid gap-3">
            <button @click="$router.push('/home')" type="button" class="btn btn-secondary">Kodu</button>
            <button @click="$router.push('/reserve')" type="button" class="btn btn-secondary">Tahan süüa</button>
<!--            <button @click="$router.push('/reservations')" type="button" class="btn btn-secondary">Minu broneeringud</button>-->
            <button @click="navigateToMyOffersView()" type="button" class="btn btn-secondary">Minu pakkumised</button>
            <button @click="$router.push('/offer')" type="button" class="btn btn-secondary">Pakun süüa</button>
            <button @click="handleLogout" type="button" class="btn btn-secondary">Logi välja</button>

            <div v-show="successMessage.length > 0" class="alert alert-success" role="alert">
              {{ successMessage }}
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
        </div>

        <div class="col">
        </div>

        <div class="col col-2">
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import OffersTable from "@/components/OffersTable.vue";
import LogoutModal from "@/components/modal/LogoutModal.vue";
import DeleteEventModal from "@/components/modal/DeleteEventModal.vue";
import router from "@/router";

export default {
  name: "ReservationsView",
  components: {DeleteEventModal, LogoutModal, OffersTable},
  computed: {
    getHighlightStyle() {
      return 'background-color: #ff5b6d !important;';
    }
  },

  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      successMessage: '',
      myEvents: [
        {
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
        alert('Error: Could not populate my events table!')
      })
    },
    openDeleteEventModal(event) {
      this.$refs.deleteEventRef.$refs.modalRef.openModal()
      this.$refs.deleteEventRef.event = event
    },
    handleSuccessfulDeletion() {
      this.getMyEvents()
      this.successMessage = 'Broneering kustutatud!'
      setTimeout(() => {
        this.successMessage = '';
      }, 2000)
    },
    handleLogout() {
      this.$refs.logoutModalRef.$refs.modalRef.openModal()
    },
    formatDate(date){
      const parts = date.split('-');
      return `${parts[2]}.${parts[1]}`
    },
    navigateToMyOffersView() {
      router.push({name: 'myOffersRoute'})
    },
  },
  mounted() {
    this.getMyEvents()
  }
}
</script>