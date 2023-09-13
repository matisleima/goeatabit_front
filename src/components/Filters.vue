<template>
  <div>
    <div class="d-grid gap-3 mt-5">
      <district-dropdown @event-update-selected-district-id="setSelectedDistrictId"/>

      <input type="date" class="form-control" v-model="filter.selectedDate">

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

      <button type="button" @click="emitFilters" class="btn btn-secondary">Filtreeri</button>
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
      }
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
      this.filter.selectedDistrictId = selectedDistrictId
    },
    emitFilters() {
      this.$emit('event-filter', this.filter)
    },

  },
  mounted() {
    this.getFoodGroups()
  }
}
</script>