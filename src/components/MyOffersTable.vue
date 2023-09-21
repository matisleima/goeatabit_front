<template>
  <delete-offer-modal ref="deleteOfferRef" @event-offer-deletion-success="showOfferDeleteSuccessMessage"/>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Pakkumise nr.</th>
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
        <td><a>{{ formatDate(offer.date) }}</a></td>
        <td><a>{{ offer.time }}</a></td>
        <td><a>{{ offer.offerName }}</a></td>
        <td><a>{{ offer.description }}</a></td>
        <td><a>{{ offer.price }}€</a></td>
        <td><a>{{  offer.totalPortions }}</a></td>
        <td><a>
          <font-awesome-icon @click="navigateToOfferView(offer.offerId)" class="hoverable-link m-2"
                             :icon="['fas', 'pen-to-square']"/>
          <font-awesome-icon @click="openDeleteOfferModal(offer)" class="hoverable-link m-2"
                             :icon="['fas', 'trash']"/>
        </a></td>
      </tr>
      </tbody>
    </table>
    <AlertSuccess :alert-message="successMessage"/>
  </div>
</template>

<style>


</style>


<script>
import DeleteOfferModal from "@/components/modal/DeleteOfferModal.vue";
import router from "@/router";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: "MyOffersTable",
  components: {AlertSuccess, DeleteOfferModal},
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
          time: '',
          address: '',
          firstName: '',
          lastName: '',
          price: 0,
          totalPortions: 0,
          userRating: 0
        }
      ],
      successMessage: ''
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
      }).catch(error => {
        this.handleErrorResponse(error)
      })
    },

    navigateToOfferView(offerId) {
      router.push({name: 'offerRoute', query: {offerId:offerId}})
    },

    openDeleteOfferModal(offer) {
      this.$refs.deleteOfferRef.$refs.modalRef.openModal()
      this.$refs.deleteOfferRef.offer = offer
    },

    showOfferDeleteSuccessMessage(successMessage) {
      this.getFilteredOffers()
      this.successMessage = successMessage
      setTimeout(() => {this.successMessage = ''}, 2000 )
    },
    formatDate(date){
      const parts = date.split('-');
      return `${parts[2]}.${parts[1]}`
    }


  },
  mounted() {
    this.getFilteredOffers()
  },
}
</script>