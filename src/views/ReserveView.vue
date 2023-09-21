<template>
  <logout-modal ref="logoutModalRef"/>
  <BookConfirmModal ref="bookConfirmModalRef"/>

  <div v-if="userId === 0">
    <h1>
      <router-link to="/">Palun logi sisse!</router-link>
    </h1>
  </div>

  <div v-show="userId != 0">

    <div class="container">
      <div class="row mt-5">
        <div class="col col-4">
          <h1>BRONEERI LÕUNA</h1>
        </div>

        <div class="col">
        </div>

        <div class="col col-2">
        </div>

      </div>
      <div class="row">
        <div class="col col-2">
          <filters @event-emit-filter-request="passFilterOn"
          />
        </div>

        <div class="col mt-5 shift-toright">
          <offers-table @event-open-user-offer-view="openUserOfferView" @event-book-meal="handleBookingConfirmationModal" ref="filterRequestRef" :filter="filter"/>
        </div>

        <div class="col col-2">
          <div class="d-grid gap-3">
            <button @click="$router.push('/home')" type="button" class="btn btn-secondary">Kodu</button>
<!--            <button @click="$router.push('/reserve')" type="button" class="btn btn-secondary">Tahan süüa</button>-->
            <button @click="$router.push('/reservations')" type="button" class="btn btn-secondary">Minu broneeringud</button>
            <button @click="navigateToMyOffersView()" type="button" class="btn btn-secondary">Minu pakkumised</button>
            <button @click="$router.push('/offer')" type="button" class="btn btn-secondary">Pakun süüa</button>
            <button @click="handleLogout" type="button" class="btn btn-secondary">Logi välja</button>
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
import loginView from "@/views/LoginView.vue";
import DistrictDropdown from "@/components/DistrictDropdown.vue";
import Filters from "@/components/Filters.vue";
import BookConfirmModal from "@/components/modal/BookConfirmModal.vue";
import router from "@/router";

export default {
  name: "ReserveView",
  components: {BookConfirmModal, Filters, DistrictDropdown, OffersTable, LogoutModal},
  data() {
    return {
      userId: 0,
      filter: {
        selectedDistrictId: 0,
        selectedDate: '',
        selectedFoodGroupId: 0,
        description: '',
        priceLimit: ''
      },
    }
  },
  methods: {
    handleLogout() {
      this.$refs.logoutModalRef.$refs.modalRef.openModal()
    },
    handleBookingConfirmationModal(offerId) {
      this.$refs.bookConfirmModalRef.$refs.modalRef.openModal()
      this.$refs.bookConfirmModalRef.offerId = offerId
      this.$refs.bookConfirmModalRef.getMealConfirmationInfo()
    },
    passFilterOn(filter) {
      this.filter = filter
      this.$refs.filterRequestRef.getFilteredOffers()
    },
    openUserOfferView(userId) {
      router.push({name:'userOffersRoute', query: {userId:userId}})
    },
    navigateToMyOffersView() {
      router.push({name: 'myOffersRoute'})
    },
  },
  mounted() {
    this.userId = Number(sessionStorage.getItem('userId'))
  }
}
</script>