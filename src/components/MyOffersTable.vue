<template>

  <div>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">offerId_test</th>
        <th scope="col">Kuupäev</th>
        <th scope="col">Kell</th>


        <th scope="col">Söök</th>
        <th scope="col">Kirjeldus</th>
        <th scope="col">Hind</th>
        <th scope="col">Vabu kohti</th>

        <th scope="col">*Edit*</th>

      </tr>
      </thead>

      <tbody>
      <tr v-for="offer in filteredOffers" :key="filteredOffers.offerId">
        <td><a>{{ offer.offerId }}</a></td>
        <td><a>{{ offer.date }}</a></td>
        <td><a>{{ offer.time }}</a></td>


        <td><a>{{ offer.offerName }}</a></td>
        <td><a>{{ offer.description }}</a></td>


        <td><a>{{ offer.price }}€</a></td>

        <td><a>?</a></td>

        <td><a>
          <font-awesome-icon @click="navigateToOfferView(offer.offerId)" class="hoverable-link m-2" :icon="['fas', 'pen-to-square']"/>
          &#20;
          <font-awesome-icon @click="openDeleteOfferModal(offer.offerId)" class="hoverable-link m-2" :icon="['fas', 'trash']"/>
        </a></td>



      </tr>
      </tbody>
    </table>
  </div>
</template>

<style>


</style>


<script>
import DeleteOfferModal from "@/components/modal/DeleteOfferModal.vue";

export default {
  name: "MyOffersTable",
  components: {DeleteOfferModal},


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
              districtId: 0,
              date: '',
              foodGroupId: 0,
              description: '',
              priceLimit: 0,
              userId: sessionStorage.getItem('userId')
            }
          }
      ).then(response => {
        this.filteredOffers = response.data
        console.log(response.data)
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },

    navigateToOfferView(offerId) {
      alert("update offer view: " + offerId)
    },

    openDeleteOfferModal(offerId) {
      alert("delete offer: " + offerId)
      this.$emit("event-open-delete-offer-modal", offerId)

    }




  },
  mounted() {
    this.getFilteredOffers()
  },
}
</script>