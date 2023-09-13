<template>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Kuupäev</th>
        <th scope="col">Kell</th>
        <th scope="col">Aadress</th>
        <th scope="col">Pakkuja</th>
        <th scope="col">Söök</th>
        <th scope="col">Hind</th>
        <th scope="col">Vabu kohti</th>
        <th scope="col">Lähen sööma</th>
        <th scope="col">Hinnang</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="offer in offers" :key="offers.offerId">
        <td><a>{{offer.date}}</a></td>
        <td><a>{{offer.time}}</a></td>
        <td><a>{{offer.address}}</a></td>
        <td><a>{{offer.firstName}} {{offer.lastName}}</a></td>
        <td><a>{{offer.offerName}}</a></td>
        <td><a>{{offer.price}}€</a></td>
        <td><a>?</a></td>
        <td><a>

          <button type="button" class="btn btn-success">Go Eat A Bit!</button>

        </a></td>
        <td><a>{{offer.userRating}}</a></td>

      </tr>
      </tbody>
    </table>


  </div>
</template>

<script>
export default {
  name: "OffersTable",

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
            lastName: ''
          }
          ]

    }
  },
methods: {
  getOffers()
  {
    this.$http.get("/meals/offers")
        .then(response => {
          // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
          this.offers = response.data
        })
        .catch(error => {
          // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
          const errorResponseBody = error.response.data
        })
  }

},
  mounted() {
    this.getOffers()

  },
}
</script>