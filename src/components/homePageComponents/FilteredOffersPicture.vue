<template>
  <div>
    <h3 v-show="offers.length === 0">Praegu sinu linnaosas pakkumisi pole!</h3>

    <div class="container">
      <div class="row justify-content-center">

        <div class="col col-4" v-for="offer in offers" :key="offer.offerId">
          <div class="row m-3" @click="openBookConfirmModal(offer.offerId)" style="cursor: pointer">
            <UserImage :image-data-base64="offer.imageString"/>

            <div class="row" style="font-weight: bold; ">
              Pakkuja: {{ offer.firstName }} {{ offer.lastName }}
            </div>

            <div style="font-weight: bold; " class="row">
              Pakkumine: {{ offer.offerName }}
            </div>

            <div class="row" style="font-weight: bold; ">
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
        this.offers = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },
    openBookConfirmModal(offerId) {
      this.$emit('event-open-modal', offerId)

    },
    formatDate(date) {
      const parts = date.split('-');
      return `${parts[2]}.${parts[1]}`
    }
  },

  beforeMount() {
    this.getOffers()
  },
}
</script>