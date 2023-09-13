<template>
  <LogoutModal ref="logoutModalRef"/>
  <div>
    <h1>Tänased TOP pakkumised MINGI_FILTER</h1>
  </div>

<!--  //PILDID-->

  <LandingPageFilteredOffersPicture/>

<!--  //TABEL-->

  <HomePageFilteredOffersTable/>

<!--  //NUPUD-->

  <HomePageButtons :handle-logout="handleLogout"/>


</template>

<script>
import LogoutModal from "@/components/modal/LogoutModal.vue";
import LandingPageFilteredOffersPicture from "@/components/homePageComponents/HomePageFilteredOffersPicture.vue";
import HomePageFilteredOffersTable from "@/components/homePageComponents/HomePageFilteredOffersTable.vue";
import HomePageButtons from "@/components/homePageComponents/HomePageButtons.vue";

export default{
  name: 'HomeView',
  components: {HomePageButtons, HomePageFilteredOffersTable, LandingPageFilteredOffersPicture, LogoutModal},

  methods: {

    handleLogout() {
      this.$refs.logoutModalRef.$refs.modalRef.openModal()
    },

  }

}





</script>