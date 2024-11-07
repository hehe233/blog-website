<template>
  <div>
    <Header></Header>
    <Container :viewName="viewName">
      <router-view></router-view>
    </Container>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import Header from '../components/Header.vue';
import Container from '@/components/Container.vue';

const route = useRoute();

const viewName = computed(() => {
  switch (route.name) {
    case 'home':
      return 'home';
    case 'journals':
      return 'journals';
    case 'comment':
    case 'about':
      return 'sheet';
    case 'links':
      return 'links';
    case 'search':
      return 'search';
    case 'categories':
      return 'categories';
    case 'tags':
      return 'tags';
    case 'archives':
      return 'archives';
    default:
      return 'home';
  }
});
</script>