<template>
  <div>
    <Modal close-button-name="Sulge" ref="modalRef" @event-modal-closed="resetModalInfo()">
      <template #header>
        <h3>Kasutaja loomine</h3>
      </template>
      <template #body>
        <div class="row">
          <div class="col">
            <AlertDanger :alert-message="errorResponse.message"/>
<!--            <AlertSuccess :alert-message="successMessage"/>-->
          </div>
        </div>
        <div class="container text-center">
          <div class="row">
            <div class="col">
              <div class="d-grid gap-3">
                <div class="form-floating">
                  <input v-model="user.firstName" type="text" class="form-control" id="floatingFirstName">
                  <label for="floatingFirstName">Eesnimi</label>
                </div>
                <div class="form-floating">
                  <input v-model="user.lastName" type="text" class="form-control" id="floatingLastName">
                  <label for="floatingLastName">Perekonnanimi</label>
                </div>
                <div class="form-floating">
                  <input v-model="user.email" type="text" class="form-control" id="floatingEmail">
                  <label for="floatingEmail">e-mail</label>
                </div>
                <div class="form-floating">
                  <input v-model="user.password" type="password" class="form-control" id="floatingPassword">
                  <label for="floatingPassword">Parool</label>
                </div>
                <div class="form-floating">
                  <input v-model="passwordAgain" type="password" class="form-control" id="floatingPasswordAgain">
                  <label for="floatingPasswordAgain">Parool uuesti</label>
                </div>
                <DistrictDropdown @event-update-selected-district-id="setUserDistrictId" ref="districtDropdownRef"/>
                <div class="form-floating">
                  <input v-model="user.address" type="text" class="form-control" id="floatingAddress">
                  <label for="floatingAddress">Aadress</label>
                </div>
                <ImageInput @event-emit-base64="setUserImageData"/>
                <div class="col col-3">
                  <UserImage :image-data-base64="user.imageString"/>
                </div>

              </div>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <button @click="validateForm" type="button" class="btn btn-success m-3" >Loo kasutaja</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";
import LocationInfoBody from "@/components/modal/Modal.vue";
import ImageInput from "@/components/ImageInput.vue";
import DistrictDropdown from "@/components/DistrictDropdown.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import UserImage from "@/components/UserImage.vue";
import {USER_NAME_UNAVAILABLE} from "@/assets/script/ErrorCode";
import {FILL_ALL_FIELDS, PASSWORD_NOT_MATCHING, USER_REGISTERED} from "@/assets/script/AlertMessage";
import modal from "@/components/modal/Modal.vue";


export default {
  name: 'SignupModal',
  components: {UserImage, AlertSuccess, AlertDanger, DistrictDropdown, ImageInput, Modal},

  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        districtId: 0,
        address: '',
        imageString: ''
      },

      passwordAgain: '',

      successMessage: '',

      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },

  methods: {
    setUserDistrictId(selectedDistrictId) {
      this.user.districtId = selectedDistrictId
    },

    setUserImageData(imageDataBase64) {
      this.user.imageString = imageDataBase64
    },

    allFieldsAreFilled() {
      let check = this.user;
      return check.firstName.length > 0 &&
          check.lastName.length > 0 &&
          check.email.length > 0 &&
          check.password.length > 0 &&
          check.districtId > 0 &&
          check.address.length > 0
    },

    validatePassword() {
      return this.user.password === this.passwordAgain
    },

    validateForm() {
      if(!this.allFieldsAreFilled()){
        this.errorResponse.message = FILL_ALL_FIELDS
      } else {
        if(!this.validatePassword()) {
          this.errorResponse.message = PASSWORD_NOT_MATCHING
          this.user.password = ''
          this.passwordAgain = ''
        } else {
          this.sendRegisterUserRequest()
        }
      }
    },

    sendRegisterUserRequest() {
      this.$http.post("/sign-up", this.user
      ).then(response => {
        this.handleRegisterUserSuccessResponse()
      }).catch(error => {
        this.handleErrorResponse(error)
      })
    },

    handleRegisterUserSuccessResponse() {
      this.successMessage = USER_REGISTERED
      this.resetAllFields();
      this.$emit('event-user-registration-success', this.successMessage)
      this.$refs.modalRef.closeModal()
    },

    handleErrorResponse(error) {
      if (error.response.data.errorCode === USER_NAME_UNAVAILABLE) {
        this.errorResponse.message = error.response.data.message
      }
    },

    resetAllFields() {
      this.user.firstName = ''
      this.user.lastName = ''
      this.user.email = ''
      this.user.password = ''
      this.passwordAgain = ''
      this.$refs.districtDropdownRef.setSelectedDistrictId(0)
      this.user.address = ''
      this.user.imageString = ''
      this.errorResponse.message = ''
      this.errorResponse.errorCode = 0
    },

    resetModalInfo() {
      this.resetAllFields()
      this.errorResponse.message = ''
    }


  }

}
</script>