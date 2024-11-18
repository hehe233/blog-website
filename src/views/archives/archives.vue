<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(()=> {
  console.log(route.params)
})
</script>

<style lang="scss">
  
</style>