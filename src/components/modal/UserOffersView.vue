<template>
  <div>

    <div class="row">
      <div class="col">
        USER IMAGE, propsiga kaasa alla
        <UserImage :image-data-base64="offerUserImageString"/>
      </div>

      <div class="col">


        <offers-table/>



















      </div>

      <div class="col">
        NAVIGATION BUTTONS
      </div>
    </div>


  </div>
</template>

<script>
import UserImage from "@/components/UserImage.vue";
import OffersTable from "@/components/OffersTable.vue";

export default {
  name: "UserOfferView",
  components: {OffersTable, UserImage},
  data() {
    return {
      offerUserId: 4, //SEE VÄÄRTUSTATAKSE HOME PAGE'ILT TULLES! KELLE NIMELE KLIKID?
      offerUserImageString: '',
      offers: [
        {
          offerId: 0,
          userId: 0,
          offerName: '',
          description: '',
          date: 0,
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
    getUserImage() {
      this.$http.get("/image", {
            params: {
              userId: this.offerUserId
            }
          }
      ).then(response => {
        this.offerUserImageString = response.data
      })
    },
    getUserOffers() {
      this.$http.get("/meals/filtered-offers", {
            params: {
              districtId: 0,
              date: '',
              foodGroupId: 0,
              description: '',
              priceLimit: 0,
              userId: this.offerUserId,
            }
          }
      ).then(response => {
        this.offers = response.data
      }).catch(error => {
      })
    },
  },
  mounted() {
    this.getUserImage()
    this.getUserOffers()
  }
}
</script>