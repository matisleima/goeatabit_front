<template>
  <LogoutModal ref="logoutModalRef"/>
  <div>
    <h1>Tänased TOP pakkumised MINGI_FILTER</h1>
  </div>

  <!--  //PILDID-->

  <LandingPageFilteredOffersPicture/>

  <!--  //TABEL-->

  <HomePageFilteredOffersTable :offers="offers"/>

  <!--  //NUPUD-->

  <HomePageButtons :handle-logout="handleLogout"/>


</template>

<script>
import LogoutModal from "@/components/modal/LogoutModal.vue";
import LandingPageFilteredOffersPicture from "@/components/homePageComponents/HomePageFilteredOffersPicture.vue";
import HomePageFilteredOffersTable from "@/components/homePageComponents/HomePageFilteredOffersTable.vue";
import HomePageButtons from "@/components/homePageComponents/HomePageButtons.vue";

export default {
  name: 'HomeView',
  components: {HomePageButtons, HomePageFilteredOffersTable, LandingPageFilteredOffersPicture, LogoutModal},

  data() {
    return {
      offerId: 0,
      offers: [
        {
          offerId: 0,
          userId: 0,
          userRating: 0,
          time: '',
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
          lastName: ''
        }
      ]
    }
  },
  methods: {

    handleLogout() {
      this.$refs.logoutModalRef.$refs.modalRef.openModal()
    },
  }
}
</script>