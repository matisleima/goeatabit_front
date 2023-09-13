<template>
  <LogoutModal ref="logoutModalRef"/>
  <div>
    //TODO:LOOGELISED SULUD EI TÖÖTA ALL-> kasutajaga seotud sitrict
    <h1>Tänased TOP pakkumised {{ userId}}</h1>
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
      userId: 0,
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

  },
  beforeMount() {
    this.userId = sessionStorage.getItem('userId')

  },
  getDistrict() {
    this.$http.get("/some/path", {
          params: {
            userId: this.userId,
          }
        }
    ).then(response => {
      // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
      const responseBody = response.data
    }).catch(error => {
      // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
      const errorResponseBody = error.response.data
    })
  },


}


</script>