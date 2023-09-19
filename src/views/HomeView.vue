<template>
  <div>
  <LogoutModal ref="logoutModalRef"/>
  <BookConfirmModal ref="bookingConfirmModalRef"/>

  <div>
    <h1>{{locations.districtName}}, järgmised pakkumised </h1>
  </div>

<!--  //PILDID-->
  <FilteredOffersPicture @event-open-modal="openBookingModal"/>

<!--  //TABEL-->

  <h1>3 viimasena lisatud pakkumist</h1>


  <FilteredOffersTable/>

<!--  //NUPUD-->

  <HomePageButtons :handle-logout="handleLogout"/>

  </div>
</template>

<script>
import LogoutModal from "@/components/modal/LogoutModal.vue";
import FilteredOffersTable from "@/components/homePageComponents/FilteredOffersTable.vue";
import HomePageButtons from "@/components/homePageComponents/Buttons.vue";
import router from "@/router";
import BookConfirmModal from "@/components/modal/BookConfirmModal.vue";
import FilteredOffersPicture from "@/components/homePageComponents/FilteredOffersPicture.vue";

export default{
  name: 'HomeView',
  components: {
    BookConfirmModal,
    HomePageButtons, FilteredOffersTable, LogoutModal, FilteredOffersPicture},

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
    openBookingModal(userId,offerId) {
      this.$refs.bookingConfirmModalRef.$refs.modalRef.openModal()
      this.$refs.bookingConfirmModalRef.getOfferByOfferId(userId, offerId)
    },
    openUserOfferView(userId) {
      router.push({name:'userOffersRoute', query: {userId:userId}})
    },

  },
  beforeMount() {
    this.userId = sessionStorage.getItem('userId')
    this.getDistrict()

  },


}


</script>