<template>
  <div>
    <div class="d-grid gap-3 mt-5">
      <district-dropdown/>

      <select class="form-select " aria-label="Default select example">
        <option selected :value="0">Kuupäev</option>
        <option v-for="district in districts" :value="district.districtId" :key="district.districtId">
          {{ district.districtName }}
        </option>
      </select>

      <select class="form-select" aria-label="Default select example">
        <option selected :value="0">Söök</option>
        <option v-for="foodGroup in foodGroups" :value="foodGroup.foodGroupId" :key="foodGroup.foodGroupId">
          {{ foodGroup.foodGroupName }}
        </option>
      </select>

      <input type="text" class="form-control " placeholder="Kirjeldus...">

      <select class="form-select " aria-label="Default select example">
        <option selected :value="0">Piirhind</option>
        <option v-for="district in districts" :value="district.districtId" :key="district.districtId">
          {{ district.districtName }}
        </option>
      </select>

      <button type="button" class="btn btn-secondary">Filtreeri</button>
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
      ]
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

  },
  mounted() {
    this.getFoodGroups()

  }


}
</script>