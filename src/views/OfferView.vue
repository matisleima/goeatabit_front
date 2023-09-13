<template>
  <LogoutModal ref="logoutModalRef"/>
  <h3>Lisan uue pakkumise</h3>
  <div class="container text-center">
    <div class="row">
      <div class="col-6">
        <AlertDanger :alert-message="errorResponse.message"/>
        <AlertSuccess :alert-message="successMessage"/>
        <div class="d-grid gap-3">
          <input v-model="offer.date" :min="new Date().toISOString().substr(0, 10)" type="date" class="form-control"
                 placeholder="Kuupäev">
          <input v-model="offer.time" type="number" class="form-control" placeholder="Kellaaeg">
          <input v-model="offer.foodGroupId" type="text" class="form-control" placeholder="_food group here_">
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
          <button @click="validateForm" type="button" class="btn btn-secondary">Lisa pakkumine</button>
        </div>

      </div>
      <div class="col">

      </div>
      <div class="col">
        <div class="d-grid gap-3">
          <button @click="handleLogout" type="button" class="btn btn-secondary">Tahan süüa</button>
          <button @click="handleLogout" type="button" class="btn btn-secondary">Minu pakkumised</button>
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

export default {
  name: 'OfferView',
  components: {LogoutModal, Modal, AlertSuccess, AlertDanger},


  data() {
    return {
      offer: {
        offerId: 0,
        userId: sessionStorage.getItem('userId'),
        userRating: '',
        time: '',
        date: '',
        price: '',
        totalPortions: '',
        offerName: '',
        description: '',
        foodGroupId: 1,
        offerStatus: 'A',
        address: '',
        districtId: 0
      },

      successMessage: '',
      errorResponse: {
        message: ''
      },

    }
  },

  methods: {
    resetForm() {
      this.offer.date = ''
      this.offer.time = ''
      this.offer.foodGroupId = ''
      this.offer.offerName = ''
      this.offer.description = ''
      this.offer.price = ''
      this.offer.totalPortions = ''
    },

    validateForm() {
      if (!this.allFieldsAreFilled()) {
        this.errorResponse.message = FILL_ALL_FIELDS
      } else {
        this.sendOfferRequest()
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


    sendOfferRequest() {
      this.$http.post("/meals/offers", this.offer
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

  }
}

</script>


<style>
#descriptionbox {
  height: 100px;
}

</style>

