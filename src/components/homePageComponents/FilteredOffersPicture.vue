<template>

  <div class="container">
    <div class="row justify-content-center">


      <div class="col col-2" v-for="offer in offers" :key="offer.offerId" >
        <div class="row">
          <UserImage :image-data-base64="offer.imageString"/>
          <p @click="openUserOfferModal" type="submit" style="cursor: pointer; color: blue; text-decoration: underline;">  {{offer.offerName}} - {{offer.time}}</p>
        </div>
      </div>

    </div>
  </div>

</template>
<script>
import router from "@/router";
import UserImage from "@/components/UserImage.vue";
import UserOfferModal from "@/components/modal/UserOfferModal.vue";

export default {
  name: 'FilteredOffersPicture',
  components: {UserOfferModal, UserImage},

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
          time: ''
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
      }).catch(error => {
        // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
        router.push({name: 'errorRoute'})
      })
    },
    openUserOfferModal() {
      this.$emit("event-open-modal")

    },

    navigateToUserOffersView(offerId) {
      router.push({name: 'userOffersRoute', query: {offerId: offerId}})
    },
  },

  beforeMount() {
    this.getOffers()
  },
}

</script>