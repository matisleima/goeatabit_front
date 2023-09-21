<template>
  <div class="container">
    <div class="row">
      <div class="col col-9">

        <table class="table">
          <thead>
          <tr>
            <th scope="col">Pakkuja</th>
            <th scope="col">Pakkumine</th>
            <th scope="col">Veel pakkumisi</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="offer in offers" :key="offer.offerId">
            <td @click="navigateToUserOffersView(offer.userId)"><a>
              {{ offer.firstName }}{{ " " }}{{ offer.lastName }}
            </a></td>

            <td><a>{{ offer.offerName }}</a></td>
            <td><a>
              <button type="button" class="btn btn-success" @click="navigateToUserOffersView(offer.userId)">
                Go Eat A Bit!
              </button>
            </a>
            </td>
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
      router.push({name: 'userOffersRoute', query: {offerUserId: offerUserId}})
    },

  },
  beforeMount() {
    this.getOffers()
  }
}
</script>