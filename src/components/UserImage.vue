<template>
    <img v-if="imageDataBase64 === ''" src="../assets/smiley.png" class="img-thumbnail"/>
    <img v-else :src="imageDataBase64" class="img-thumbnail">
</template>
<script>
export default {
    name: 'UserImage',
    props: {
        imageDataBase64: String
    }
}
</script>