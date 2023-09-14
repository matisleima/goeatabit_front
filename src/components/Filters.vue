<template>
  <div>
    <div class="d-grid gap-3 mt-5">
      <h5>Täpsem otsing</h5>

      <district-dropdown @event-update-selected-district-id="setSelectedDistrictId"/>

      <input type="date" class="form-control" v-model="filter.selectedDate"
             :min="new Date().toISOString().substr(0, 10)">

      <select class="form-select" aria-label="Default select example"
              :value="filter.selectedFoodGroupId"
              @input="filter.selectedFoodGroupId = $event.target.value">
        <option :value="0">Toidu kategooria</option>
        <option v-for="foodGroup in foodGroups" :value="foodGroup.foodGroupId" :key="foodGroup.foodGroupId">
          {{ foodGroup.foodGroupName }}
        </option>
      </select>

      <input type="text" class="form-control " v-model="filter.description" placeholder="Kirjeldus...">

      <input type="number" class="form-control " v-model="filter.priceLimit" placeholder="Maksimumhind (€)" min="0">

      <button type="button" @click="sendFilterRequest" class="btn btn-secondary">Filtreeri</button>
    </div>

  </div>
</template>

<script>
import DistrictDropdown from "@/components/DistrictDropdown.vue";
import ImageInput from "@/components/ImageInput.vue";
import UserImage from "@/components/UserImage.vue";

export default {
  name: "Filters",
  components: {UserImage, ImageInput, DistrictDropdown},
  data() {
    return {
      userId: Number(sessionStorage.getItem('userId')),
      foodGroups: [
        {
          foodGroupId: 0,
          foodGroupName: ''
        }
      ],
      filter: {
        selectedDistrictId: 0,
        selectedDate: '',
        selectedFoodGroupId: 0,
        description: '',
        priceLimit: ''
      },

    }

  },

  methods: {
    getFoodGroups() {
      this.$http.get("/food-groups")
          .then(response => {
            // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
            this.foodGroups = response.data
          })
          .catch(error => {
            // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
            const errorResponseBody = error.response.data
          })
    },
    setSelectedDistrictId(selectedDistrictId) {
      this.emitFilter.selectedDistrictId = selectedDistrictId
    },
    sendFilterRequest() {
      this.$emit('event-emit-filter-content', this.filter)
      this.$emit('event-emit-filter-request')
    },
  },
  mounted() {
    this.getFoodGroups()
  }
}
</script>