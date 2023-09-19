<template>
  <div>

    <div class="row">
      <div class="col col-6 m-3">
          <h1>Kasutaja {{ offers[0].firstName }} {{ offers[0].lastName }} pakkumised</h1>
      </div>

      <div class="col">
      </div>

      <div class="col">
      </div>
    </div>

    <div class="row">
      <div class="col">
        <UserImage :image-data-base64="offerUserImageString"/>
      </div>

      <div class="col col-7">
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
          <tr v-for="offer in offers" :key="offer.offerId">
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
        console.log('image string pärast väärtustamist', response.data)
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
  beforeMount() {
    this.getUserImage()
    this.getUserOffers()
  }
}
</script>