<template>
  <LogoutModal ref="logoutModalRef"/>
  <BookConfirmModal ref="bookingConfirmModalRef"/>

  <div class="container text-center">
    <div class="row">

      <div class="col m-3 col-9">
        <h1>{{ districtName }}, JÄRGMISED PAKKUMISED </h1>
      </div>

      <div class="col">
      </div>

      <div class="col">
      </div>
      <div class="row">
        <div class="col">
        </div>

        <div class="col">
        </div>

        <div class="col">
        </div>
      </div>
    </div>

    <!--  //PILDID-->
    <div class="row">
      <div class="col col-9">
        <FilteredOffersPicture @event-open-modal="openBookingModal"/>
      </div>

      <div class="col col-3">
        <div class="d-grid gap-3">
          <button @click="$router.push('/reserve')" type="button" class="btn btn-secondary">Rohkem valikuid</button>
          <button @click="$router.push('/reservations')" type="button" class="btn btn-secondary">Minu broneeringud</button>
          <button @click="navigateToMyOffersView()" type="button" class="btn btn-secondary">Minu pakkumised</button>
          <button @click="$router.push('/offer')" type="button" class="btn btn-secondary">Pakun süüa</button>
          <button @click="handleLogout" type="button" class="btn btn-secondary">Logi välja</button>
        </div>
      </div>
    </div>

    <div class="row mb-5">
      <div class="col">
      </div>

      <div class="col">
      </div>

      <div class="col">
      </div>
    </div>

    <!--  //TABEL-->
    <div class="row">
      <div class="col m-3 col-9">
        <h1>KOLM VIIMAST PAKKUMIST</h1>
      </div>

      <FilteredOffersTable @event-open-userOfferView="openUserOfferView"/>
    </div>
  </div>
</template>

<script>
import LogoutModal from "@/components/modal/LogoutModal.vue";
import FilteredOffersTable from "@/components/homePageComponents/FilteredOffersTable.vue";
import router from "@/router";
import BookConfirmModal from "@/components/modal/BookConfirmModal.vue";
import FilteredOffersPicture from "@/components/homePageComponents/FilteredOffersPicture.vue";
import UserOfferView from "@/views/UserOffersView.vue";

export default{
  name: 'HomeView',
  components: {
    UserOfferView,
    BookConfirmModal,
    FilteredOffersTable, LogoutModal, FilteredOffersPicture},

  data() {
    return {
      districtName: ''
    }
  },
  methods: {
    handleLogout() {
      this.$refs.logoutModalRef.$refs.modalRef.openModal()
    },
    getDistrict() {
      this.$http.get("/district", {
            params: {
              userId: this.userId,
            }
          }
      ).then(response => {
        // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
        this.districtName = response.data
      }).catch(error => {
        // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
        router.push({name: 'errorRoute'})
      })
    },
    openBookingModal(offerId) {
      this.$refs.bookingConfirmModalRef.$refs.modalRef.openModal()
      this.$refs.bookingConfirmModalRef.offerId = offerId
      this.$refs.bookingConfirmModalRef.getMealConfirmationInfo()
    },
    openUserOfferView(userId) {
      router.push({name: 'userOffersRoute', query: {userId: userId}})
    },
    navigateToMyOffersView() {
      router.push({name: 'myOffersRoute'})
    },
  },
  beforeMount() {
    this.userId = sessionStorage.getItem('userId')
    this.getDistrict()
  },
}
</script>