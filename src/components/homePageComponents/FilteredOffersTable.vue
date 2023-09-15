<template>
  <div class="container">
    <div class="row">
      <div class="col">

        <table class="table">
          <thead>
          <tr>
            <th scope="col">Pakkuja</th>
            <th scope="col">Pakkumine</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(offer, index) in offers.slice(Math.max(offers.length-3,0))" :key="offer.offerId">
            <td @click="navigateToUserOffersView(offer.offerId)"
                style="cursor: pointer; color: blue; text-decoration: underline;">{{offer.firstName}}{{" "}}{{offer.lastName}}</td>
            <td> {{offer.offerName}}</td>
          </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>
<script>
import router from "@/router";

export default {
  name: 'HomePageFilteredOffersTable',

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
  beforeMount(){
    this.getOffers()
  }
}
</script>