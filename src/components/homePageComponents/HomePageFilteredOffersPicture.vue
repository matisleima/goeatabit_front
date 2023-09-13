<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <img src="../../assets/script/meal.jpg" height="400" width="400"
        @click="navigateToUserOffersView"/>
      </div>

      <div v-for="offer in offers" :value="offer.offerId" :key="offer.offerId" class="col">
        <img :src="offer.imageString || '../../assets/script/meal.jpg'">
        <a @click="navigateToUserOffersView(offer.offerId)">
          {{offer.offerName}}
        </a>
        <p>{{offer.offerName}}</p>
        <p>{{offer.address}}</p>

      </div>

    </div>
  </div>
</template>
<script>
import router from "@/router";

export default {
  name: 'LandingPageFilteredOffersPicture',


data(){
  return{

    offers:[
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
        imageString:''
      }
    ]
  }
},

  methods:{
    getOffers() {
      this.$http.get("/meals/offers")
          .then(response => {
            // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
            this.offers = response.data
          })
          .catch(error => {
            // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
            router.push({name:'errorRoute'})
          })
    },
    navigateToUserOffersView(offerId){
      router.push({name:'userOffersRoute', query:{offerId:offerId}})
    },
  },
  beforeMount() {
    this.getOffers()
  },
}

</script>