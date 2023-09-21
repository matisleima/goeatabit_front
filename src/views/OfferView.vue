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
          <div class="form-floating">
            <input v-model="offer.date" type="date" :min="new Date().toISOString().substr(0,10)" class="form-control"
                   id="floatingDate">
            <label for="floatingDate">Kuupäev</label>
          </div>
          <div class="form-floating">
            <input v-model="offer.time" type="time" class="form-control" id="floatingTime">
            <label for="floatingTime">Aeg</label>
          </div>

          <FoodGroupDropDown @event-update-selected-food-group-id="setOfferFoodGroupId" ref="foodGroupRef"/>

          <div class="form-floating">
            <input v-model="offer.offerName" type="text" class="form-control" id="floatingName">
            <label for="floatingName">Toidu nimetus</label>
          </div>
          <div class="form-floating">
            <input v-model="offer.description" type="text" class="form-control" id="floatingDescription">
            <label for="floatingDescription">Kirjeldus</label>
          </div>
          <div class="form-floating">
            <input v-model="offer.price" type="number" :min="0" class="form-control" id="floatingPrice">
            <label for="floatingPrice">Hind</label>
          </div>
          <div class="form-floating">
            <input v-model="offer.totalPortions" type="number" :min="1" class="form-control" id="floatingPortions">
            <label for="floatingPortions">Mitmele inimesele süüa pakud?</label>
          </div>
        </div>
        <p></p>
        <div>
          <button @click="resetForm" type="button" class="btn btn-secondary m-3">
            Tühjenda väljad
          </button>
          <button v-if="isEdit" @click="validateFormAndSendUpdateOfferRequest" type="button"
                  class="btn btn-success m-3">
            Muuda pakkumine
          </button>
          <button v-else @click="validateFormAndSendAddOfferRequest" type="button" class="btn btn-success m-3">
            Lisa pakkumine
          </button>
        </div>
      </div>

      <div class="col">
      </div>

      <div class="col">
        <div class="d-grid gap-3">
          <button @click="$router.push({name: 'reserveRoute'})" type="button" class="btn btn-secondary">
            Tahan süüa
          </button>
          <button @click="$router.push({name: 'myOffersRoute'})" type="button" class="btn btn-secondary">
            Minu
            pakkumised
          </button>
          <button @click="handleLogout" type="button" class="btn btn-secondary">
            Logi välja
          </button>
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
import {FILL_ALL_FIELDS, OFFER_ADDED, OFFER_MODIFIED, USER_REGISTERED} from "@/assets/script/AlertMessage";
import {OFFER_ALREADY_EXISTS, USER_NAME_UNAVAILABLE} from "@/assets/script/ErrorCode";
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
        time: '',
        foodGroupId: 0,
        offerName: '',
        description: '',
        price: 0,
        totalPortions: 0,
        userId: sessionStorage.getItem('userId')
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
        this.title = "PAKKUMISE MUUTMINE"
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
          check.time !== '' &&
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
        this.handleUpdateOfferSuccessResponse()
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

    handleUpdateOfferSuccessResponse() {
      this.successMessage = OFFER_MODIFIED
      this.resetForm();
      this.isEdit = false;
      this.title = "PAKKUMISE LISAMINE";
      this.$emit('event-offer-update-success', this.successMessage)
      setTimeout(() => {
        this.successMessage = ''
      }, 2000)
    },

    handleErrorResponse(error) {
      if (error.response.data.errorCode === OFFER_ALREADY_EXISTS) {
        alert("error")
        // this.errorResponse.message = error.response.data.message
      } else {
        alert("some other error happened")
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
#floatingDescription {
  height: 100px;
}


</style>

