<template>
  <select v-model="selectedFoodGroupId" @change="emitSelectedFoodGroupId" class="form-select" id="foodgroup" aria-label="Default select example">
    <option :value="0">Toidu kategooria</option>
    <option v-for="foodGroup in foodGroups" :value="foodGroup.foodGroupId" :key="foodGroup.foodGroupId">
      {{ foodGroup.foodGroupName }}
    </option>
  </select>
</template>

<script>
import router from "@/router";
export default {
  name: "FoodGroupDropDown",
  data() {
    return {
      selectedFoodGroupId: 0,

      foodGroups: [
        {
          foodGroupId: 0,
          foodGroupName: ''
        }
      ]
    }
  },

  methods: {

    setSelectedFoodGroupId(selectedFoodGroupId) {
      this.selectedFoodGroupId = selectedFoodGroupId
    },


    getFoodGroups() {
      this.$http.get("/food-groups")
          .then(response => {
            // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
            this.foodGroups = response.data
          })
          .catch(error => {
            // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
            router.push({name: 'errorRoute'})
          })
    },

    emitSelectedFoodGroupId() {
      this.$emit('event-update-selected-food-group-id', this.selectedFoodGroupId)
    }

  },

  mounted() {
    this.getFoodGroups()
  }
}
</script>


<style>
#foodgroup {
  height: 60px;
}

</style>