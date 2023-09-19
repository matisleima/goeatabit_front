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
          <tr v-for="offer in offers" :key="offer.offerId">
            <td @click="navigateToUserOffersView(offer.userId)" type="submit"
                style="cursor: pointer; color: blue; text-decoration: underline;">
              {{ offer.firstName }}{{ " " }}{{ offer.lastName }}
            </td>
            <td> {{ offer.offerName }}</td>
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
  name: 'FilteredOffersTable',

  data() {
    return {
      offers: [
        {
          offerId: 0,
          userId: 0,
          offerName: '',
          firstName: '',
          lastName: ''
        }
      ]
    }
  },

  methods: {
    getOffers() {
      this.$http.get("/meals/offers/last-3")
          .then(response => {
            console.log(response.data)

            // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
            this.offers = response.data
          })
          .catch(error => {
            // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
            router.push({name: 'errorRoute'})
          })
    },
    navigateToUserOffersView(offerUserId) {
      // this.$emit('event-open-userOfferView', userId)
      router.push({name: 'userOffersRoute', query: {offerUserId: offerUserId}})
    },

  },
  beforeMount() {
    this.getOffers()
  }
}
</script>