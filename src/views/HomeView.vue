<template>
  <LogoutModal ref="logoutModalRef"/>
  <div>
    <h1>Järgmised kellaajaliselt lähimat pakkumist {{locations.districtName}}</h1>
  </div>

<!--  //PILDID-->

  <LandingPageFilteredOffersPicture :districtId="locations.districtId"/>

<!--  //TABEL-->

  <h1>3 viimasena lisatud pakkumist</h1>


  <HomePageFilteredOffersTable :offers="offers"/>

<!--  //NUPUD-->

  <HomePageButtons :handle-logout="handleLogout"/>


</template>

<script>
import LogoutModal from "@/components/modal/LogoutModal.vue";
import LandingPageFilteredOffersPicture from "@/components/homePageComponents/FilteredOffersPicture.vue";
import HomePageFilteredOffersTable from "@/components/homePageComponents/FilteredOffersTable.vue";
import HomePageButtons from "@/components/homePageComponents/Buttons.vue";
import router from "@/router";

export default{
  name: 'HomeView',
  components: {HomePageButtons, HomePageFilteredOffersTable, LandingPageFilteredOffersPicture, LogoutModal},

  data() {
    return {
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
          lastName: '',
          imageString: '',
        } 
      ],
      locations:[
        {
          districtId: 0,
          districtName: ''
        }
      ]
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
        this.locations = response.data
      }).catch(error => {
        // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
        router.push({name: 'errorRoute'})
      })
    },

  },
  beforeMount() {
    this.userId = sessionStorage.getItem('userId')
    this.getDistrict()

  },


}


</script>