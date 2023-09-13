<template>
  <LogoutModal ref="logoutModalRef"/>

  <div v-if="userId === 0">
    <h1>
      <router-link to="/">Palun logi sisse!</router-link>
    </h1>
  </div>

  <div v-show="userId != 0">

    <div class="container">
      <div class="row mt-5">
        <div class="col col-4">
          <h1>BRONEERI LÕUNA</h1>
        </div>

        <div class="col">

        </div>

        <div class="col col-2">
          <button @click="handleLogout" type="button" class="btn btn-secondary">Logi välja</button>
        </div>

      </div>
      <div class="row">
        <div class="col col-2">
          <filters/>
        </div>

        <div class="col mt-5">
          <offers-table/>
        </div>

        <div class="col col-2">

        </div>
      </div>

    </div>
  </div>
</template>


<script>
import OffersTable from "@/components/OffersTable.vue";
import LogoutModal from "@/components/modal/LogoutModal.vue";
import loginView from "@/views/LoginView.vue";
import DistrictDropdown from "@/components/DistrictDropdown.vue";
import Filters from "@/components/Filters.vue";

export default {
  name: "ReserveView",
  computed: {
    loginView() {
      return loginView
    }
  },
  components: {Filters, DistrictDropdown, OffersTable, LogoutModal},
  data() {
    return {
      userId: 0,

    }
  },
  methods: {
    handleLogout() {
      this.$refs.logoutModalRef.$refs.modalRef.openModal()
    },
    catchFilter(filter) {
      this.filter = filter
    },

  },
  mounted() {
    this.userId = Number(sessionStorage.getItem('userId'))
  }
}
</script>