<template>
  <div>
    <Modal close-button-name="Loo konto" ref="modalRef">
      <template #header>
        <h3>Konto loomine</h3>
      </template>
      <template #body>
        <SignupBody></SignupBody>
      </template>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";
import LocationInfoBody from "@/components/modal/Modal.vue";
import SignupBody from "@/components/modal/SignupBody.vue";

export default {
  name: 'SignupModal',
  components: {SignupBody, Modal},

}
</script>