<template>
  <div>
    <Modal close-button-name="Ei" ref="modalRef">

      <template #header>
        <h3>Logime välja</h3>
      </template>

      <template #body>
        <h3>Kas oled kindel?</h3>
      </template>

      <template #footer>
        <button @click="executeLogOut" type="button" class="btn btn-success">Jah</button>
      </template>

    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
  name: 'LogoutModal',
  components: {Modal},
  methods: {
    executeLogOut() {
      sessionStorage.clear()
      this.$refs.modalRef.closeModal()
      router.push({name: 'loginRoute'})
    },
  }
}
</script>
<style>

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

</style>