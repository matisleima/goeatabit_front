<template>
  <div class="container">
    <div class="row">

      //TODO: userImageString kuvamine ei tööta (võimalik viga, pildiga pakkumine puudub ja ei saa ka "" tekitada)
      //TODO: imageString kuvamine töötab
      //TODO: välista pildita pakkumised!!
      //TODO: kuvada user`´ i pildid, pakkumised useri piirkonnas,
      3 kellaajaliselt varajasemat pakkumist
      <p></p>
<!--            <div v-for="offer in offers" :value="offer.offerId" :key="offer.offerId" class="col">-->
      <div v-for="(offer, index) in offers.slice(Math.max(offers.length-2,0))" :value="offer.offerId"
           :key="offer.offerId" class="col">
        <img :src="offer.imageString" height="300" width="300">
        <a @click="navigateToUserOffersView(offer.offerId)">
          {{ offer.offerName }}
        </a>
        <p>{{ offer.address }}</p>

      </div>

    </div>
  </div>
</template>
<script>
import router from "@/router";

export default {
  name: 'LandingPageFilteredOffersPicture',


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
          userImageString: ''
        }
      ]
    }
  },

  methods: {
    getOffers() {
      this.$http.get("/meals/offers")
          .then(response => {
            // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
            this.offers = response.data
          })
          .catch(error => {
            // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
            router.push({name: 'errorRoute'})
          })
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