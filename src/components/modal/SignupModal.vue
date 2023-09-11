<template>
  <div>
    <Modal close-button-name="Sulge" ref="modalRef">
      <template #header>
        <h3>Kasutaja loomine</h3>
      </template>
      <template #body>
        <div class="row">
          <div class="col">
            <AlertDanger :alert-message="errorResponse.message"/>
            <AlertSuccess :alert-message="successMessage"/>
          </div>
        </div>
        <div class="container text-center">
          <div class="row">
            <div class="col">
              <div class="d-grid gap-3">
                <input v-model="user.firstName" type="text" class="form-control" placeholder="Sisesta eesnimi">
                <input v-model="user.lastName" type="text" class="form-control" placeholder="Sisesta perekonnanimi">
                <input v-model="user.email" class="form-control" placeholder="Sisesta e-mail">
                <input v-model="user.password" type="password" class="form-control" placeholder="Sisesta parool">
                <input type="password" class="form-control" placeholder="Sisesta parool uuesti *ei tööta veel*">

                <DistrictDropdown @event-update-selected-district-id="setUserDistrictId"/>

                <input v-model="user.address" type="text" class="form-control" id="" placeholder="Sisesta aadress">

                <ImageInput @event-emit-base64="setUserImageData"/>

              </div>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <button @click="registerUser" type="button" class="btn btn-secondary" >Loo kasutaja</button>
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

export default {
  name: 'SignupModal',
  components: {AlertSuccess, AlertDanger, DistrictDropdown, ImageInput, Modal},

  data() {
    return {
      successMessage: '',

      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        districtId: 0,
        address: '',
        imageString: ''
      },

      errorResponse: {
        message: '',
        errorCode: 0
      },
    }
  },
  methods: {
    setUserDistrictId(selectedDistrictId) {
      this.user.districtId = selectedDistrictId
    },

    setUserImageData(imageDataBase64) {
      this.user.imageString = imageDataBase64
    },

    registerUser() {
      this.$http.post("/sign-up", this.user
      ).then(response => {
        // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
        const responseBody = response.data
      }).catch(error => {
        // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
        const errorResponseBody = error.response.data
      })
    }

  }

}
</script>