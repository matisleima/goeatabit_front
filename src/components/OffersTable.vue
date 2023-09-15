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
        <th scope="col">Hinnang</th>
        <th scope="col">Lähen sööma</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="offer in filteredOffers" :key="filteredOffers.offerId">
        <td><a>{{ offer.date }}</a></td>
        <td><a>{{ offer.time }}</a></td>
        <td><a>{{ offer.address }}</a></td>
        <td><a>{{ offer.firstName }} {{ offer.lastName }}</a></td>
        <td>
          <div class="hover-container">
            <a>{{ offer.offerName }}</a>
            <div class="hover-text">{{ offer.description }}</div>
          </div>
        </td>
        <td><a>{{ offer.price }}€</a></td>
        <td><a>?</a></td>
        <td><a>{{ offer.userRating }}</a></td>
        <td>
            <a>
              <button type="button" class="btn btn-success" @click="launchConfirmModal(offer.offerId, offer.userId)">Go Eat A Bit!</button>
            </a>
        </td>

      </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.hover-container {
  position: relative;
  display: inline-block;
}

.hover-text {
  visibility: hidden;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, -8px);
  background-color: #333;
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  text-align: center;
}

.hover-container:hover .hover-text {
  visibility: visible;
}
</style>

<script>
export default {
  name: "OffersTable",
  props: {
    filter: {}
  },

  data() {
    return {
      filteredOffers: [
        {
          offerId: 0,
          userId: 0,
          offerName: '',
          description: '',
          date: '',
          time: 0,
          address: '',
          firstName: '',
          lastName: '',
          price: 0,
          availableMeals: 0,
          userRating: 0
        }
      ]
    }
  },

  methods: {
    getFilteredOffers() {
      this.$http.get("meals/filtered-offers", {
            params: {
              districtId: this.filter.selectedDistrictId,
              date: this.filter.selectedDate,
              foodGroupId: this.filter.selectedFoodGroupId,
              description: this.filter.description,
              priceLimit: Number(this.filter.priceLimit),
            }
          }
      ).then(response => {
        this.filteredOffers = response.data
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },
    launchConfirmModal(offerId, userId) {
      this.$emit('event-book-meal', offerId, userId)
    },

  },
  mounted() {
    this.getFilteredOffers()
  },
}
</script>