<template>
    <img v-if="imageDataBase64 === ''" src="../assets/smiley.png" class="img-thumbnail" />
    <img v-else :src="imageDataBase64" class="img-thumbnail" style="background-color: rgba(255,255,255,0)">
</template>
<script>
export default {
    name: 'UserImage',
    props: {
        imageDataBase64: String
    }
}
</script>

<style>

body{
  //background-color: #e70d2a;

}


</style>