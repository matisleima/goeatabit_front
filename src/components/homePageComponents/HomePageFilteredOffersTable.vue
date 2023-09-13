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
          <tr v-for="offer in offers" :value="offer.offerId" :key="offer.offerId">
            <td>{{offer.firstName}}{{" "}}{{offer.lastName}}</td>
            <td> {{offer.offerName}}</td>
          </tr>
<!--          <tr>-->
<!--            <td>Jacob</td>-->
<!--            <td>Thornton</td>-->
<!--          </tr>-->
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

  // props:{
  //   offers:[]
  // },
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
          lastName: ''
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

  },
  beforeMount(){
    this.getOffers()
  }
}
</script>