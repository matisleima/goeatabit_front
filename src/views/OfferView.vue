<template>
  <LogoutModal ref="logoutModalRef"/>
  <div class="container text-center">
    <div class="row m-3">
      <div class="col-5">
        <h1>{{ title }}</h1>
      </div>

      <div class="col">
      </div>

      <div class="col">
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <AlertDanger :alert-message="errorResponse.message"/>
        <AlertSuccess :alert-message="successMessage"/>
        <div class="d-grid gap-3">
          <input v-model="offer.date" :min="new Date().toISOString().substr(0, 10)" type="date" class="form-control"
                 placeholder="Kuupäev">
          <input v-model="offer.time" type="number" class="form-control" placeholder="Kellaaeg">

          <FoodGroupDropDown @event-update-selected-food-group-id="setOfferFoodGroupId" ref="foodGroupRef"/>

          <input v-model="offer.offerName" type="text" size="" class="form-control" placeholder="Toidu nimi">
          <input v-model="offer.description" id="descriptionbox" type="text" class="form-control"
                 placeholder="Sisaldab...">
          <input v-model="offer.price" type="number" class="form-control" placeholder="Hind">
          <input v-model="offer.totalPortions" type="number" class="form-control" id=""
                 placeholder="Mitmele inimesele süüa pakud?">
        </div>
        <p></p>
        <div>
          <button @click="resetForm" type="button" class="btn btn-secondary">Tühjenda väljad</button>
          <button v-if="isEdit" @click="validateFormAndSendUpdateOfferRequest" type="button" class="btn btn-secondary">
            Muuda pakkumine
          </button>
          <button v-else @click="validateFormAndSendAddOfferRequest" type="button" class="btn btn-secondary">Lisa
            pakkumine
          </button>
        </div>
      </div>

      <div class="col">
      </div>

      <div class="col">
        <div class="d-grid gap-3">
          <button @click="$router.push({name: 'reserveRoute'})" type="button" class="btn btn-secondary">Tahan süüa
          </button>
          <button @click="$router.push({name: 'myOffersRoute'})" type="button" class="btn btn-secondary">Minu
            pakkumised
          </button>
          <button @click="handleLogout" type="button" class="btn btn-secondary">Logi välja</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>


import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import Modal from "@/components/modal/Modal.vue";
import LogoutModal from "@/components/modal/LogoutModal.vue";
import {FILL_ALL_FIELDS, OFFER_ADDED, USER_REGISTERED} from "@/assets/script/AlertMessage";
import {USER_NAME_UNAVAILABLE} from "@/assets/script/ErrorCode";
import FoodGroupDropDown from "@/components/FoodGroupDropdown.vue";
import {useRoute} from "vue-router";
import router from "@/router";

export default {
  name: 'OfferView',
  components: {FoodGroupDropDown, LogoutModal, Modal, AlertSuccess, AlertDanger},


  data() {
    return {
      offerId: Number(useRoute().query.offerId),
      offer: {
        date: '',
        time: 0,
        foodGroupId: 0,
        offerName: '',
        description: '',
        price: 0,
        totalPortions: 0
      },
      title: "PAKKUMISE LISAMINE",
      isEdit: false,

      successMessage: '',
      errorResponse: {
        message: ''
      },

    }
  },

  methods: {

    getOfferInfoAndUpdateFields() {
      this.$http.get("/meals/offer", {
            params: {
              offerId: this.offerId
            }
          }
      ).then(response => {
        // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
        this.offer = response.data
        this.title = "Pakkumise muutmine"
        this.$refs.foodGroupRef.selectedFoodGroupId = this.offer.foodGroupId

      }).catch(error => {
        // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
        const errorResponseBody = error.response.data
      })
    },


    resetForm() {
      this.offer.date = ''
      this.offer.time = ''
      this.$refs.foodGroupRef.setSelectedFoodGroupId(0)
      this.offer.foodGroupId = 0
      this.offer.offerName = ''
      this.offer.description = ''
      this.offer.price = ''
      this.offer.totalPortions = ''
    },

    validateFormAndSendAddOfferRequest() {
      if (!this.allFieldsAreFilled()) {
        this.errorResponse.message = FILL_ALL_FIELDS
      } else {
        this.sendAddOfferRequest()
      }
    },

    validateFormAndSendUpdateOfferRequest() {
      if (!this.allFieldsAreFilled()) {
        this.errorResponse.message = FILL_ALL_FIELDS
      } else {
        this.sendUpdateOfferRequest()
      }
    },

    allFieldsAreFilled() {
      let check = this.offer;
      return check.date !== '' &&
          check.time > 0 &&
          check.foodGroupId > 0 &&
          check.offerName.length > 0 &&
          check.price > 0 &&
          check.totalPortions > 0
    },


    sendAddOfferRequest() {
      this.errorResponse.message = ''
      this.successMessage = ''
      this.$http.post("/meals/offer", this.offer
      ).then(response => {
        // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
        this.handleAddOfferSuccessResponse()
      }).catch(error => {
        // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
        this.handleErrorResponse(error)
      })
    },

    sendUpdateOfferRequest() {
      this.errorResponse.message = ''
      this.successMessage = ''
      this.$http.put("/meals/offer", this.offer, {
            params: {
              offerId: this.offerId
            }
          }
      ).then(response => {
        // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
        this.handleAddOfferSuccessResponse()
      }).catch(error => {
        // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
        this.handleErrorResponse(error)
      })
    },


    handleLogout() {
      this.$refs.logoutModalRef.$refs.modalRef.openModal()
    },

    handleAddOfferSuccessResponse() {
      this.successMessage = OFFER_ADDED
      this.resetForm();
      this.$emit('event-offer-creation-success', this.successMessage)
    },

    handleErrorResponse(error) {
      if (error.response.data.errorCode === USER_NAME_UNAVAILABLE) {
        alert("error")
        // this.errorResponse.message = error.response.data.message
      }
    },

    setOfferFoodGroupId(selectedFoodGroupId) {
      this.offer.foodGroupId = selectedFoodGroupId;
    },

    handleIsEdit() {
      this.isEdit = !isNaN(this.offerId)
      if (this.isEdit) {
        this.getOfferInfoAndUpdateFields()
      }
    }


  },

  mounted() {
    this.handleIsEdit()

  }
}

</script>


<style>
#descriptionbox {
  height: 100px;
}

</style>

