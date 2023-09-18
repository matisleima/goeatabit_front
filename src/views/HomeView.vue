<template>
  <div>
  <LogoutModal ref="logoutModalRef"/>
  <BookConfirmModal ref="bookingConfirmModalRef"/>

  <div>
    <h1>Järgmised kellaajaliselt lähimat pakkumist {{locations.districtName}}</h1>
  </div>

<!--  //PILDID-->

  <LandingPageFilteredOffersPicture @event-open-modal="openBookingModal"/>

<!--  //TABEL-->

  <h1>3 viimasena lisatud pakkumist</h1>


  <FilteredOffersTable/>

<!--  //NUPUD-->

  <HomePageButtons :handle-logout="handleLogout"/>

  </div>
</template>

<script>
import LogoutModal from "@/components/modal/LogoutModal.vue";
import LandingPageFilteredOffersPicture from "@/components/homePageComponents/FilteredOffersPicture.vue";
import FilteredOffersTable from "@/components/homePageComponents/FilteredOffersTable.vue";
import HomePageButtons from "@/components/homePageComponents/Buttons.vue";
import router from "@/router";
import UserOfferModal from "@/components/modal/UserOfferModal.vue";
import BookConfirmModal from "@/components/modal/BookConfirmModal.vue";

export default{
  name: 'HomeView',
  components: {
    BookConfirmModal,
    UserOfferModal, HomePageButtons, FilteredOffersTable, LandingPageFilteredOffersPicture, LogoutModal},

  data() {
    return {

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
    openBookingModal() {
      this.$refs.bookingConfirmModalRef.$refs.modalRef.openModal()
    },

  },
  beforeMount() {
    this.userId = sessionStorage.getItem('userId')
    this.getDistrict()

  },


}


</script>