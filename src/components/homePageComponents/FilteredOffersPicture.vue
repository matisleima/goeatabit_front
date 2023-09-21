<template>
  <div>
    <h3 v-show="offers.length === 0">Praegu sinu linnaosas pakkumisi pole!</h3>

    <div class="container">
      <div class="row justify-content-center">


        <div class="col col-4" v-for="offer in offers" :key="offer.offerId">
          <div class="row">
            <UserImage :image-data-base64="offer.imageString"/>

            <div class="row" style="font-weight: bold; font-size: 20px;">
              Pakkuja: {{ offer.firstName }} {{ offer.lastName }}
            </div>
            <div @click="openBookConfirmModal(offer.userId, offer.offerId)" type="submit"
                 style="cursor: pointer; color: #198754; font-weight: bold; font-size: 20px;" class="row">
               Pakkumine: {{ offer.offerName }}
            </div>
            <div class="row" style="font-weight: bold; font-size: 20px;">
              Aeg: {{ formatDate(offer.date) }}, kell {{ offer.time }}
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import router from "@/router";
import UserImage from "@/components/UserImage.vue";
import BookConfirmModal from "@/components/modal/BookConfirmModal.vue";

export default {
  name: 'FilteredOffersPicture',
  components: {BookConfirmModal, UserImage},

  props: {
    districtId: Number,
  },
  data() {
    return {
      userId: Number(sessionStorage.getItem('userId')),
      offers: [
        {
          offerId: 0,
          userId: 0,
          offerName: '',
          firstName: '',
          lastName: '',
          imageString: '',
          address: '',
          time: '',
          date: ''
        }
      ]
    }
  },

  methods: {
    getOffers() {
      this.$http.get("/meals/offers/hot-3", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
        this.offers = response.data
        console.log('pärast databloki väärtistamist', this.offers)
      }).catch(error => {
        // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
        router.push({name: 'errorRoute'})
      })
    },
    openBookConfirmModal(offerId) {
      this.$emit('event-open-modal',offerId)

    },
    formatDate(date){
      const parts = date.split('-');
      return `${parts[2]}.${parts[1]}`
    }

    // navigateToUserOffersView(offerId) {
    //   router.push({name: 'userOffersRoute', query: {offerId: offerId}})
    // },
  },

  beforeMount() {
    this.getOffers()
  },
}

</script>