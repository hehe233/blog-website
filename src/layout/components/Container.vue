<template>
  <div
    class="kur_container kur_main_container animated showInUp revert"
    :class="`page-${props.viewName}`"
  >
    <div class="kur_main">
      <div :class="className">
        <slot />
      </div>
    </div>
    <Aside v-if="hasSideBar" />
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import Aside from './Aside.vue'

const props = defineProps({
  viewName: {
    type: String as PropType<'home' | 'journals' | 'links' | 'sheet' | 'archives' | 'categories' | 'tags' | 'search'>,
    required: true,
  }
});

const hasSideBar = computed(() => {
  return !(['search', 'sheet'].includes(props.viewName))
});

const className = computed(() => {
  return {
    kur_index: ['archives', 'categories', 'tags'].includes(props.viewName),
    kur_archives__filing: props.viewName === 'archives',
    kur_archive: props.viewName === 'search',
    kur_detail: [ 'journals', 'links', 'sheet' ].includes(props.viewName),
  }
});
</script>

<style lang="scss">
  .Kur {
    .kur_main_container {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      margin-top: px2rem(20px);
      &.revert {
        -webkit-box-orient: horizontal;
        -webkit-box-direction: reverse;
        -ms-flex-direction: row-reverse;
        flex-direction: row-reverse;
        .kur_aside {
          margin-left: 0;
          margin-right: px2rem(15px);
        }
      }
    }
  }
  .kur_main {
    min-width: 0;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding-bottom: px2rem(15px);
  }
  .kur_index {
    overflow-y: hidden;
    background: var(--background);
    border-radius: var(--radius-wrap);
    -webkit-box-shadow: var(--box-shadow);
    box-shadow: var(--box-shadow);
  }
  .kur_detail {
    position: relative;
    margin-bottom: px2rem(15px);
    padding: px2rem(1.25rem);
    background: var(--background);
    border-radius: var(--radius-wrap);
    -webkit-box-shadow: var(--box-shadow);
    box-shadow: var(--box-shadow);
  }
  .page-journals {
    .kur_detail {
      position: relative;
      overflow-y: hidden;
    }
  }
  .kur_archives__filing {
    background: var(--background);
    -webkit-box-shadow: var(--box-shadow);
    box-shadow: var(--box-shadow);
    border-radius: var(--radius-wrap);
  }
  .kur_archive {
    padding: 0 px2rem(15px);
    background: var(--background);
    border-radius: var(--radius-wrap);
    -webkit-box-shadow: var(--box-shadow);
    box-shadow: var(--box-shadow);
  }
</style>