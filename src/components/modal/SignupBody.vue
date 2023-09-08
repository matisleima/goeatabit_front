<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <div class="d-grid gap-3">
          <input type="text" class="form-control" id="" placeholder="Sisesta eesnimi">
          <input type="text" class="form-control" id="" placeholder="Sisesta perekonnanimi">
          <input type="email" class="form-control" id="" placeholder="Sisesta e-mail">
          <input type="password" class="form-control" id="" placeholder="Sisesta parool">
          <input type="password" class="form-control" id="" placeholder="Sisesta parool uuesti">

          <DistrictDropdown></DistrictDropdown>

<!--          <select class="form-select" aria-label="Default select example">
            <option>Vali linnaosa</option>
            <option>a</option>
            <option>b</option>
            <option>c</option>
          </select>-->
          <input type="text" class="form-control" id="" placeholder="Sisesta aadress">
          <ImageInput></ImageInput>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import ImageInput from "@/components/ImageInput.vue";
import DistrictDropdown from "@/components/DistrictDropdown.vue";

export default {
  name: 'SignupBody',
  components: {DistrictDropdown, ImageInput}

}
</script>