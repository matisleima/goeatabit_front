<template>
  <delete-offer-modal ref="deleteOfferRef"/>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">*offerId*</th>
        <th scope="col">Kuupäev</th>
        <th scope="col">Kell</th>
        <th scope="col">Söök</th>
        <th scope="col">Kirjeldus</th>
        <th scope="col">Hind</th>
        <th scope="col">Vabu kohti</th>
        <th scope="col"></th>
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
        <td><a>{{  offer.totalPortions }}</a></td>
        <td><a>
          <font-awesome-icon @click="navigateToOfferView(offer)" class="hoverable-link m-2"
                             :icon="['fas', 'pen-to-square']"/>
          &#20;
          <font-awesome-icon @click="openDeleteOfferModal(offer)" class="hoverable-link m-2"
                             :icon="['fas', 'trash']"/>
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
import router from "@/router";

export default {
  name: "MyOffersTable",
  components: {DeleteOfferModal},
  props: {

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
          totalPortions: 0,
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

    navigateToOfferView(offer) {
      alert("update offer #" + offer.offerId)
      router.push({name: 'offerRoute', query: offer})
    },

    openDeleteOfferModal(offer) {
      this.$refs.deleteOfferRef.$refs.modalRef.openModal()
      this.$refs.deleteOfferRef.offer = offer
    }


  },
  mounted() {
    this.getFilteredOffers()
  },
}
</script>