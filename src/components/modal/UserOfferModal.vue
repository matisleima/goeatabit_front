<template>
  <div>
    <Modal ref="modalRef">
      <template #header>
        Palun kinnita oam valik!
      </template>
      <template #body>

      </template>
      <template #footer>

      </template>

    </Modal>
  </div>
</template>


<script >

import Modal from "@/components/modal/Modal.vue";


export default {
  name:'UserOfferModal',
  components: {Modal},

}
</script>

